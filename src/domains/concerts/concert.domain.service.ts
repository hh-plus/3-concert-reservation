import { ConcertModel } from 'src/infrastructures/concerts/models/concert';
import { ConcertDateModel } from 'src/infrastructures/concerts/models/concert-date';
import { ConcertDateUserModel } from 'src/infrastructures/concerts/models/concert-date-user';
import { ConcertValidate } from './validations/concert.validate';

export class ConcertDomainService {
  public readonly expireTime = 5;

  getAvailableDate(
    concert: ConcertModel,
    concertDates: ConcertDateModel[],
    concertDateUsers: ConcertDateUserModel[],
  ) {
    const results: { id: number; date: string }[] = [];
    const maxSeats = concert.maxSeats;

    for (const concertDate of concertDates) {
      if (
        !ConcertValidate.checkFullSeats(
          maxSeats,
          concertDateUsers.filter((cd) => cd.concertDateId === concertDate.id),
        )
      ) {
        results.push({
          id: concertDate.id,
          date: new Date(concertDate.date).toISOString(),
        });
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
      const existConcertDateUser = concertDateUsers.find((cd) => cd.seat === i);
      if (
        !existConcertDateUser ||
        !ConcertValidate.checkExpiredSeat(existConcertDateUser)
      ) {
        results.push(i);
      }
    }
    return results;
  }

  getExpriedAt() {
    const now = new Date();
    now.setMinutes(now.getMinutes() + this.expireTime);
    return now;
  }
}
