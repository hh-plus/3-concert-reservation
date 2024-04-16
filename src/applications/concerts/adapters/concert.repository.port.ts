import { ConcertModel } from 'src/infrastructures/concert/models/concert';
import { ConcertDateModel } from 'src/infrastructures/concert/models/concert-date';
import { ConcertDateUserModel } from 'src/infrastructures/concert/models/concert-date-user';

export interface ConcertRepositoryPort {
  getConcertById(concertId: number): Promise<ConcertModel | null>;
  getConcertDateById(concertDateId: number): Promise<ConcertDateModel | null>;
  getConcertDatesByConcertId(
    concertId: number,
  ): Promise<ConcertDateModel[] | []>;
  getConcertDateUsersByConcertDateId(
    concertDateId: number | number[],
  ): Promise<ConcertDateUserModel[] | []>;
}
