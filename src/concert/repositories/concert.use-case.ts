import { Injectable } from '@nestjs/common';
import { ConcertRepository } from './concert.repository';
import { ConcertMapper } from './concert.mapper';
import { ConcertRepositoryPort } from '../adapters/concert.repository.port';

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
}
