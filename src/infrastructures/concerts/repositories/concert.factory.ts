import { ConflictException, Injectable } from '@nestjs/common';
import { ConcertReaderRepository } from './concert.reader.repository';

import { ConcertRepositoryPort } from '../../../applications/concerts/adapters/concert.repository.port';
import { ConcertMapper } from '../mappers/concert.mapper';
import { ConcertRepository } from './concert.repository';
import { ConcertDateUser, Prisma } from '@prisma/client';
import { ConcertDateUserModel } from '../models/concert-date-user';

@Injectable()
export class ConcertFactory implements ConcertRepositoryPort {
  constructor(
    private readonly concertReaderRepository: ConcertReaderRepository,
    private readonly concertRepository: ConcertRepository,
  ) {}

  async getConcertById(concertId: number) {
    const concert = await this.concertReaderRepository.getConcertById(
      concertId,
    );
    return concert ? ConcertMapper.convertingConcert(concert) : null;
  }

  async getConcertDateById(concertDateId: number) {
    const concertDate = await this.concertReaderRepository.getConcertDateById(
      concertDateId,
    );
    return concertDate
      ? ConcertMapper.convertingConcertDate(concertDate)
      : null;
  }

  async getConcertDatesByConcertId(concertId: number) {
    const concertDates =
      await this.concertReaderRepository.getConcertsDateByConcertId(concertId);
    return concertDates ? ConcertMapper.mappingConcertDates(concertDates) : [];
  }

  async getConcertDateUserById(
    concertDateUserId: number,
  ): Promise<ConcertDateUserModel | null> {
    const concertDateUser =
      await this.concertReaderRepository.getConcertDateUserById(
        concertDateUserId,
      );
    return concertDateUser
      ? ConcertMapper.convertingConcertDateUser(concertDateUser)
      : null;
  }

  async getConcertDateUsersByConcertDateId(concertDateId: number | number[]) {
    const concertDateUsers =
      await this.concertReaderRepository.getConcertDateUserByConcertDateIds(
        concertDateId,
      );
    return concertDateUsers
      ? ConcertMapper.mappingConcertDateUsers(concertDateUsers)
      : [];
  }

  async getConcertDateUserByConcertDateIdAndSeat(
    concertDateId: number,
    seat: number,
  ) {
    const concertDateUser =
      await this.concertReaderRepository.getConcertDateUserBy({
        concertDateId,
        seat,
      });

    return concertDateUser
      ? ConcertMapper.convertingConcertDateUser(concertDateUser)
      : null;
  }

  async createConcertDateUser(
    tx: Prisma.TransactionClient,
    concertDateId: number,
    userId: number,
    seat: number,
    expiredAt: Date,
  ): Promise<ConcertDateUserModel> {
    try {
      const concertDateUser =
        await this.concertRepository.createConcertDateUser(
          tx,
          concertDateId,
          userId,
          seat,
          expiredAt,
        );
      return ConcertMapper.convertingConcertDateUser(concertDateUser);
    } catch (err) {
      throw new ConflictException('이미 예약된 좌석입니다.');
    }
  }

  async updateConcertDateUser(
    transaction: Prisma.TransactionClient,
    concertDateUser: ConcertDateUserModel,
  ): Promise<void> {
    return await this.concertRepository.updateConcertDateUser(
      transaction,
      concertDateUser,
    );
  }

  async deleteConcertDateUser(
    transaction: Prisma.TransactionClient,
    concertDateUserId: number,
  ): Promise<void> {
    await this.concertRepository.deleteConcertDateUserById(
      transaction,
      concertDateUserId,
    );
  }
}
