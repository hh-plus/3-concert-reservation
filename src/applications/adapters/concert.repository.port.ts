import { ConcertModel } from 'src/infrastructures/concert/models/concert';
import { ConcertDateModel } from 'src/infrastructures/concert/models/concert-date';
import { ConcertDateUserModel } from 'src/infrastructures/concert/models/concert-date-user';

export interface ConcertRepositoryPort {
  getConcert(concertId: number): Promise<ConcertModel | null>;
  getConcertDates(concertId: number): Promise<ConcertDateModel[] | []>;
  getConcertDateUsers(
    concertDateId: number,
  ): Promise<ConcertDateUserModel[] | []>;
}
