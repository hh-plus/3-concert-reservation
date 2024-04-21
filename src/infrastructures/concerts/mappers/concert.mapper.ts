import { Injectable } from '@nestjs/common';
import { ConcertReaderRepository } from '../repositories/concert.reader.repository';
import { ConcertModel } from '../../../domains/concerts/models/concert';
import { ConcertDateModel } from '../../../domains/concerts/models/concert-date';
import { ConcertDateUserModel } from '../../../domains/concerts/models/concert-date-user';

export class ConcertMapper {
  static convertingConcert(concert: ConcertModel) {
    return {
      id: concert.id,
      name: concert.name,
      maxSeats: concert.maxSeats,
      price: concert.price,
    };
  }

  static convertingConcertDate(concertDate: ConcertDateModel) {
    return {
      id: concertDate.id,
      date: concertDate.date,
      concertId: concertDate.concertId,
    };
  }

  static convertingConcertDateUser(concertDateUser: ConcertDateUserModel) {
    return {
      id: concertDateUser.id,
      concertDateId: concertDateUser.concertDateId,
      userId: concertDateUser.userId,
      seat: concertDateUser.seat,
      payStatus: concertDateUser.payStatus,
      expiredAt: concertDateUser.expiredAt,
    };
  }

  static mappingConcertDates(concertDates: ConcertDateModel[]) {
    return concertDates.map((concertDate) => {
      return {
        id: concertDate.id,
        date: concertDate.date,
        concertId: concertDate.concertId,
      };
    });
  }

  public static mappingConcertDateUsers(
    concertDateUsers: ConcertDateUserModel[],
  ) {
    return concertDateUsers.map((concertDateUser) => {
      return {
        id: concertDateUser.id,
        concertDateId: concertDateUser.concertDateId,
        userId: concertDateUser.userId,
        seat: concertDateUser.seat,
        payStatus: concertDateUser.payStatus,
        expiredAt: concertDateUser.expiredAt,
      };
    });
  }
}
