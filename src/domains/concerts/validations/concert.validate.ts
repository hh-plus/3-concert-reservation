import { ConcertDateUserModel } from 'src/domains/concerts/models/concert-date-user';
import { AlreadyReserveSeatException } from '../exceptions/already-reserve-seat.exception';
import { UnauthorizedException } from '@nestjs/common';

export class ConcertValidate {
  static checkFullSeats(
    maxSeats: number,
    concertDateUsers: ConcertDateUserModel[],
  ): boolean {
    return concertDateUsers.length >= maxSeats;
  }

  static checkSeatExist(
    concertDateUser: ConcertDateUserModel | null,
  ): asserts concertDateUser is ConcertDateUserModel {
    if (concertDateUser) {
      throw new AlreadyReserveSeatException();
    }
  }

  static checkExpiredSeat(concertDateUser: ConcertDateUserModel) {
    if (concertDateUser.expiredAt < new Date()) {
      return false;
    }
    return true;
  }

  static checkAvailableUser(
    concertDateUser: ConcertDateUserModel,
    userId: number,
  ) {
    if (concertDateUser.userId !== userId) {
      throw new UnauthorizedException();
    }
  }

  static checkCashGreaterThanPrice(cash: number, price: number) {
    if (cash < price) {
      throw new UnauthorizedException();
    }
  }
}
