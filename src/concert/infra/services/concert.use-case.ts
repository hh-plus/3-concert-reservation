import { Injectable } from '@nestjs/common';
import { ConcertRepository } from '../repositories/concert.repository';
import { ConcertMapper } from './concert.mapper';
import { ConcertRepositoryPort } from '../../adapters/concert.repository.port';
import { ConcertValidate } from './concert.validate';

@Injectable()
export class ConcertUseCase implements ConcertRepositoryPort {
  constructor(private readonly concertRepository: ConcertRepository) {}

  async getAvailableDate(concertId: number) {
    const concerts = await this.concertRepository.getConcertsIncludeConcertDate(
      concertId,
    );

    const result = ConcertMapper.mappingAvailableDate(concerts);
    return result;
  }

  async getAvailableSeats(concertId: number, concertDateId: number) {
    const concerts = await this.concertRepository.getConcertById(concertId);
    const concertSeats = await this.concertRepository.getSeatsByConcertDateId(
      concertDateId,
    );
    ConcertValidate.validateSeats(concerts.maxSeats, concertSeats);
    const result = ConcertMapper.mappingAvailableSeats(
      concerts.maxSeats,
      concertSeats,
    );
    return result;
  }
}
