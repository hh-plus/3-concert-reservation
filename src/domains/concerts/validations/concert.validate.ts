import { ConcertDateUserModel } from 'src/infrastructures/concerts/models/concert-date-user';
import { AlreadyReserveSeatException } from '../exceptions/already-reserve-seat.exception';
import { ConflictException, UnauthorizedException } from '@nestjs/common';

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
    if (!concertDateUser) {
      throw new ConflictException('Not exist seat');
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
      throw new UnauthorizedException('Not available user');
    }
  }

  static checkCashGreaterThanPrice(cash: number, price: number) {
    if (cash < price) {
      throw new UnauthorizedException('Not enough cash');
    }
  }
}
