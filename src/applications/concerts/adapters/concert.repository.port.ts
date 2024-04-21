import { ConcertDateUser, Prisma } from '@prisma/client';
import { ConcertModel } from 'src/domains/concerts/models/concert';
import { ConcertDateModel } from 'src/domains/concerts/models/concert-date';
import { ConcertDateUserModel } from 'src/domains/concerts/models/concert-date-user';

export interface ConcertRepositoryPort {
  getConcertById(concertId: number): Promise<ConcertModel | null>;
  getConcertDateById(concertDateId: number): Promise<ConcertDateModel | null>;
  getConcertDatesByConcertId(
    concertId: number,
  ): Promise<ConcertDateModel[] | []>;

  getConcertDateUserById(
    concertDateUserId: number,
  ): Promise<ConcertDateUserModel | null>;
  getConcertDateUsersByConcertDateId(
    concertDateId: number | number[],
  ): Promise<ConcertDateUserModel[] | []>;
  getConcertDateUserByConcertDateIdAndSeat(
    concertDateId: number,
    seat: number,
  ): Promise<ConcertDateUserModel | null>;

  createConcertDateUser(
    tx: Prisma.TransactionClient,
    concertDateId: number,
    userId: number,
    seat: number,
    expiredAt: Date,
  ): Promise<ConcertDateUserModel>;

  updateConcertDateUser(
    tx: Prisma.TransactionClient,
    concertDateUser: ConcertDateUserModel,
  ): Promise<void>;

  deleteConcertDateUser(
    transaction: Prisma.TransactionClient,
    concertDateUserId: number,
  ): Promise<void>;
}
