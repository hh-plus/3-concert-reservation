import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConcertRepositoryPort } from './adapters/concert.repository.port';
import { ConcertServicePort } from '../../apis/concerts/concert.service.port';
import { ConcertDomainService } from 'src/domains/concerts/concert.domain.service';
import { NotFoundConcertException } from 'src/domains/concerts/exceptions/not-found-concert.exception';
import { ReserveConcertReqDto } from 'src/apis/concerts/dto/reserve-concert.dto';
import { ConcertValidate } from 'src/domains/concerts/validations/concert.validate';
import { PrismaService } from '@@prisma/prisma.service';

import { CashRepositoryPort } from '../cash/adapters/cash.repository.port';
import { CashValidationService } from 'src/domains/cash/validation/cash.validation.service';

import { RedisService } from 'src/infrastructures/common/redis/redis.service';
import { RedisLock } from 'src/infrastructures/common/redis/redis.lock';

@Injectable()
export class ConcertService implements ConcertServicePort {
  constructor(
    @Inject('concertRepositoryPort')
    private readonly concertRepositoryPort: ConcertRepositoryPort,

    private readonly concertDomainService: ConcertDomainService,

    @Inject('cashRepositoryPort')
    private readonly cashRepositoryPort: CashRepositoryPort,

    private readonly prismaService: PrismaService,

    private readonly redisLock: RedisLock,
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

      if (concertDateUser && !ConcertValidate.checkExpiredSeat) {
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
    const retry = 10;
    let count = 0;

    while (count < retry) {
      const lock = await this.redisLock.lockUser(userId);
      if (lock) {
        try {
          // await this.redisLock.lockUser(userId);
          const userCashLog = await this.cashRepositoryPort.getCashListByUserId(
            userId,
          );
          const concert = await this.concertRepositoryPort.getConcertById(
            concertId,
          );

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

          concertDateUser.payStatus = 'PAID';

          return await this.prismaService.$transaction(async (tx) => {
            await this.cashRepositoryPort.use(userId, concert.price);

            return await this.concertRepositoryPort.updateConcertDateUser(
              tx,
              concertDateUser,
            );
          });
        } catch (err) {
          throw new Error(err);
        } finally {
          await this.redisLock.unlockUser(userId);
        }
      }

      if (!lock) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        count++;
        continue;
      }
    }
    throw new Error('Failed to get lock');
  }
}
