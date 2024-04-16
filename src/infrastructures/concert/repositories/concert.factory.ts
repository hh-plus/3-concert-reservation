import { Injectable } from '@nestjs/common';
import { ConcertReaderRepository } from './concert.reader.repository';

import { ConcertRepositoryPort } from '../../../applications/concerts/adapters/concert.repository.port';
import { ConcertMapper } from '../mappers/concert.mapper';

@Injectable()
export class ConcertFactory implements ConcertRepositoryPort {
  constructor(private readonly concertRepository: ConcertReaderRepository) {}

  async getConcertById(concertId: number) {
    const concert = await this.concertRepository.getConcertById(concertId);
    return concert ? ConcertMapper.convertingConcert(concert) : null;
  }

  async getConcertDateById(concertDateId: number) {
    const concertDate = await this.concertRepository.getConcertDateById(
      concertDateId,
    );
    return concertDate
      ? ConcertMapper.convertingConcertDate(concertDate)
      : null;
  }

  async getConcertDatesByConcertId(concertId: number) {
    const concertDates =
      await this.concertRepository.getConcertsDateByConcertId(concertId);
    return concertDates ? ConcertMapper.mappingConcertDates(concertDates) : [];
  }

  async getConcertDateUsersByConcertDateId(concertDateId: number | number[]) {
    const concertDateUsers =
      await this.concertRepository.getSeatsByConcertDateIds(concertDateId);
    return concertDateUsers
      ? ConcertMapper.mappingConcertDateUsers(concertDateUsers)
      : [];
  }
}
