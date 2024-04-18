import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConcertRepositoryPort } from './adapters/concert.repository.port';
import { ConcertServicePort } from '../../apis/concerts/concert.service.port';
import { ConcertDomainService } from 'src/domains/concerts/concert.domain.service';
import { NotFoundConcertException } from 'src/domains/concerts/exceptions/not-found-concert.exception';
import { ReserveConcertReqDto } from 'src/apis/concerts/dto/reserve-concert.dto';
import { ConcertValidate } from 'src/domains/concerts/validations/concert.validate';
import { PrismaService } from '@@prisma/prisma.service';
import { ConcertDateModel } from 'src/infrastructures/concerts/models/concert-date';
import { ConcertDateUserModel } from 'src/infrastructures/concerts/models/concert-date-user';
import { PayConcertResDto } from 'src/apis/concerts/dto/pay-concert.dto';
import { CashRepositoryPort } from '../cash/adapters/cash.repository.port';
import { CashValidationService } from 'src/domains/cash/validation/cash.validation.service';

@Injectable()
export class ConcertService implements ConcertServicePort {
  constructor(
    @Inject('concertRepositoryPort')
    private readonly concertRepositoryPort: ConcertRepositoryPort,

    private readonly concertDomainService: ConcertDomainService,

    @Inject('cashRepositoryPort')
    private readonly cashRepositoryPort: CashRepositoryPort,

    private readonly prismaService: PrismaService,
  ) {}

  async getAvailableDate(concertId: number) {
    const concert = await this.concertRepositoryPort.getConcertById(concertId);
    if (!concert) {
      throw new NotFoundConcertException();
    }
    const concertDates =
      await this.concertRepositoryPort.getConcertDatesByConcertId(concertId);

    const concertDateUsers =
      await this.concertRepositoryPort.getConcertDateUsersByConcertDateId(
        concertDates.map((cd) => cd.id),
      );

    return this.concertDomainService.getAvailableDate(
      concert,
      concertDates,
      concertDateUsers,
    );
  }

  async getAvailableSeats(concertId: number, concertDateId: number) {
    const concert = await this.concertRepositoryPort.getConcertById(concertId);
    if (!concert) {
      throw new NotFoundConcertException();
    }
    const concertDate = await this.concertRepositoryPort.getConcertDateById(
      concertId,
    );
    if (!concertDate) {
      throw new NotFoundException();
    }
    const concertDateUsers =
      await this.concertRepositoryPort.getConcertDateUsersByConcertDateId(
        concertDateId,
      );
    return {
      seats: this.concertDomainService.getAvailableSeats(
        concert.maxSeats,
        concertDateUsers,
      ),
    };
  }

  async reserveConcert(
    concertDateId: number,
    reserveConcertReqDto: ReserveConcertReqDto,
    userId: number,
  ) {
    return await this.prismaService.$transaction(async (tx) => {
      const concertDateUser =
        await this.concertRepositoryPort.getConcertDateUserByConcertDateIdAndSeat(
          concertDateId,
          reserveConcertReqDto.seat,
        );

      ConcertValidate.checkSeatExist(concertDateUser);

      if (!ConcertValidate.checkExpiredSeat) {
        await this.concertRepositoryPort.deleteConcertDateUser(
          tx,
          concertDateUser.id,
        );
      }

      // check user can reserve by use multiple pk
      return await this.concertRepositoryPort.createConcertDateUser(
        tx,
        concertDateId,
        userId,
        reserveConcertReqDto.seat,
        this.concertDomainService.getExpriedAt(),
      );
    });
  }

  async payConcert(
    concertId: number,
    concertDateUserId: number,
    userId: number,
  ): Promise<void> {
    const userCashLog = await this.cashRepositoryPort.getCashListByUserId(
      userId,
    );
    const concert = await this.concertRepositoryPort.getConcertById(concertId);

    if (!concert) {
      throw new NotFoundConcertException();
    }

    const cash = CashValidationService.getCashByCashLog(userCashLog);
    ConcertValidate.checkCashGreaterThanPrice(cash, concert.price);

    const concertDateUser =
      await this.concertRepositoryPort.getConcertDateUserById(
        concertDateUserId,
      );
    ConcertValidate.checkSeatExist(concertDateUser);
    ConcertValidate.checkAvailableUser(concertDateUser, userId);
    ConcertValidate.checkExpiredSeat(concertDateUser);

    return await this.prismaService.$transaction(async (tx) => {
      return await this.concertRepositoryPort.updateConcertDateUser(
        tx,
        concertDateUser,
      );
    });
  }
}
