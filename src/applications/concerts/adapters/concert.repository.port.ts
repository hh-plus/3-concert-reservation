import { ConcertModel } from 'src/infrastructures/concerts/models/concert';
import { ConcertDateModel } from 'src/infrastructures/concerts/models/concert-date';
import { ConcertDateUserModel } from 'src/infrastructures/concerts/models/concert-date-user';

export interface ConcertRepositoryPort {
  getConcertById(concertId: number): Promise<ConcertModel | null>;
  getConcertDateById(concertDateId: number): Promise<ConcertDateModel | null>;
  getConcertDatesByConcertId(
    concertId: number,
  ): Promise<ConcertDateModel[] | []>;
  getConcertDateUsersByConcertDateId(
    concertDateId: number | number[],
  ): Promise<ConcertDateUserModel[] | []>;
  getConcertDateUserByConcertDateIdAndSeat(
    concertDateId: number,
    seat: number,
  ): Promise<ConcertDateUserModel | null>;

  createConcertDateUser(
    concertDateId: number,
    userId: number,
    seat: number,
  ): Promise<void>;
}
