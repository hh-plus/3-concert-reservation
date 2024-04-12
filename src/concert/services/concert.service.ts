import { Inject, Injectable } from '@nestjs/common';
import { ConcertRepositoryPort } from '../adapters/concert.repository.port';
import { ConcertServicePort } from '../adapters/concert.service.port';

@Injectable()
export class ConcertService implements ConcertServicePort {
  constructor(
    @Inject('concertRepositoryPort')
    private readonly concertRepositoryPort: ConcertRepositoryPort,
  ) {}

  async getAvailableDate(concertId: number) {
    return await this.concertRepositoryPort.getAvailableDate(concertId);
  }
}
