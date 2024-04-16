import { ConcertDateUserModel } from 'src/infrastructures/concert/models/concert-date-user';

export class ConcertValidate {
  static checkFullSeats(
    maxSeats: number,
    concertDateUsers: ConcertDateUserModel[],
  ): boolean {
    return concertDateUsers.length >= maxSeats;
  }
}
