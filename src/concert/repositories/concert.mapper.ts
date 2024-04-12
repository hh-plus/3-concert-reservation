import { Injectable } from '@nestjs/common';
import { ConcertRepository } from './concert.repository';

type GetConcertsIncludeType = Awaited<
  ReturnType<
    InstanceType<typeof ConcertRepository>['getConcertsIncludeConcertDate']
  >
>;

export class ConcertMapper {
  static mappingAvailableDate(concerts: GetConcertsIncludeType) {
    return {
      id: concerts.id,
      maxSeats: concerts.maxSeats,
      name: concerts.name,
      ConcertDate: concerts.ConcertDate.reduce((acc: any, cur) => {
        if (cur.ConcertDateUser.length <= concerts.maxSeats) {
          return acc.push(cur.date);
        }
      }, []),
    };
  }
}
