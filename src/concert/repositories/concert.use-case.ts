import { Injectable } from '@nestjs/common';
import { ConcertRepository } from './concert.repository';

@Injectable()
export class ConcertUseCase {
  constructor(private readonly concertRepository: ConcertRepository) {}

  async getAvailableDate(concertId: number): Promise<string[]> {
    const concerts = await this.concertRepository.getAvailableDate(concertId);
    const result = concerts.ConcertDate.filter(
      (c) => c.ConcertDateUser.length < concerts.maxSeats,
    ).map((c) => c.date.toISOString());
    return result;
  }
}
