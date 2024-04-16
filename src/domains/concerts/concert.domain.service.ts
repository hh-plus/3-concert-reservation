import { ConcertModel } from 'src/infrastructures/concerts/models/concert';
import { ConcertDateModel } from 'src/infrastructures/concerts/models/concert-date';
import { ConcertDateUserModel } from 'src/infrastructures/concerts/models/concert-date-user';
import { ConcertValidate } from './validations/concert.validate';

export class ConcertDomainService {
  getAvailableDate(
    concert: ConcertModel,
    concertDates: ConcertDateModel[],
    concertDateUsers: ConcertDateUserModel[],
  ) {
    const results: string[] = [];
    const maxSeats = concert.maxSeats;

    for (const concertDate of concertDates) {
      if (
        !ConcertValidate.checkFullSeats(
          maxSeats,
          concertDateUsers.filter((cd) => cd.concertDateId === concertDate.id),
        )
      ) {
        results.push(new Date(concertDate.date).toISOString());
      }
    }

    return results;
  }

  getAvailableSeats(
    maxSeats: number,
    concertDateUsers: ConcertDateUserModel[],
  ) {
    const results: number[] = [];
    for (let i = 1; i <= maxSeats; i++) {
      if (!concertDateUsers.some((cd) => cd.seat === i)) {
        results.push(i);
      }
    }
    return results;
  }
}
