import { ConcertDateUserModel } from 'src/infrastructures/concerts/models/concert-date-user';
import { AlreadyReserveSeatException } from '../exceptions/already-reserve-seat.exception';

export class ConcertValidate {
  static checkFullSeats(
    maxSeats: number,
    concertDateUsers: ConcertDateUserModel[],
  ): boolean {
    return concertDateUsers.length >= maxSeats;
  }

  static checkSeatExist(concertDateUser: ConcertDateUserModel | null) {
    if (concertDateUser) {
      throw new AlreadyReserveSeatException();
    }
  }
}
