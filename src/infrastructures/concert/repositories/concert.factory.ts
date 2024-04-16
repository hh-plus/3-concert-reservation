import { Injectable } from '@nestjs/common';
import { ConcertReaderRepository } from './concert.reader.repository';

import { ConcertRepositoryPort } from '../../../applications/adapters/concert.repository.port';
import { ConcertMapper } from '../mappers/concert.mapper';

@Injectable()
export class ConcertFactory implements ConcertRepositoryPort {
  constructor(private readonly concertRepository: ConcertReaderRepository) {}

  async getConcert(concertId: number) {
    const concert = await this.concertRepository.getConcertById(concertId);
    return concert ? ConcertMapper.mappingConcert(concert) : null;
  }

  async getConcertDates(concertId: number) {
    const concertDates =
      await this.concertRepository.getConcertsDateByConcertId(concertId);
    return concertDates ? ConcertMapper.mappingConcertDates(concertDates) : [];
  }

  async getConcertDateUsers(concertDateId: number | number[]) {
    const concertDateUsers =
      await this.concertRepository.getSeatsByConcertDateIds(concertDateId);
    return concertDateUsers
      ? ConcertMapper.mappingConcertDateUsers(concertDateUsers)
      : [];
  }
}
