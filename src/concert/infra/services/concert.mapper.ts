import { Injectable } from '@nestjs/common';
import { ConcertRepository } from '../repositories/concert.repository';
import { ConcertDateUser } from '@prisma/client';

type GetConcertsIncludeType = Awaited<
  ReturnType<
    InstanceType<typeof ConcertRepository>['getConcertsIncludeConcertDate']
  >
>;

export class ConcertMapper {
  static mappingAvailableDate(concerts: GetConcertsIncludeType) {
    return concerts.ConcertDate.reduce((acc: any, cur) => {
      if (cur.ConcertDateUser.length < concerts.maxSeats) {
        acc.push({ date: cur.date });
      }
    }, []);
  }

  static mappingAvailableSeats(maxSeats: number, seats: ConcertDateUser[]) {
    const seatsNums: { seats: number[] } = { seats: [] };
    for (let i = 1; i <= maxSeats; i++) {
      if (seats.find((s) => s.seat === i)) {
        continue;
      }
      seatsNums.seats.push(i);
    }
    return seatsNums;
  }
}
