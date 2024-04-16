import { Injectable } from '@nestjs/common';
import { ConcertReaderRepository } from '../repositories/concert.reader.repository';
import { ConcertModel } from '../models/concert';
import { ConcertDateModel } from '../models/concert-date';
import { ConcertDateUserModel } from '../models/concert-date-user';

export class ConcertMapper {
  static mappingConcert(concert: ConcertModel) {
    return {
      id: concert.id,
      name: concert.name,
      maxSeats: concert.maxSeats,
      price: concert.price,
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
      };
    });
  }
}
