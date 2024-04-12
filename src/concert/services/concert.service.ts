import { Inject, Injectable } from '@nestjs/common';
import { ConcertRepositoryPort } from '../adapters/concert.repository.port';

@Injectable()
export class ConcertService {
  constructor(
    @Inject('concertRepositoryPort')
    private readonly concertRepositoryPort: ConcertRepositoryPort,
  ) {}

  async getAvailableDate(concertId: number) {
    return await this.concertRepositoryPort.getAvailableDate(concertId);
  }
}
