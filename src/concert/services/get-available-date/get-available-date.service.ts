import { Injectable } from '@nestjs/common';
import { ConcertRepositoryPort } from '../port/concert.repository.port';

@Injectable()
export class GetAvailableDateService {
  constructor(private readonly concertRepository: ConcertRepositoryPort) {}

  mappingDate(dates: { date: Date }[]) {
    return dates.map((date) => date.date.toISOString());
  }

  async getAvailableDate(concertId: number): Promise<string[]> {
    const dates = await this.concertRepository.getAvailableDate(concertId);
    return this.mappingDate(dates);
  }
}
