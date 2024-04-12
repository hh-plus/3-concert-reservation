import { Injectable } from '@nestjs/common';
import { ConcertRepository } from './concert.repository';
import { ConcertMapper } from './concert.mapper';

@Injectable()
export class ConcertUseCase {
  constructor(private readonly concertRepository: ConcertRepository) {}

  async getAvailableDate(concertId: number) {
    const concerts = await this.concertRepository.getConcertsIncludeConcertDate(
      concertId,
    );

    const result = ConcertMapper.mappingAvailableDate(concerts);
    return result;
  }
}
