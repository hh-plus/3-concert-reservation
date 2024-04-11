import { Injectable } from '@nestjs/common';
import { ConcertRepositoryPort } from '../port/concert.repository.port';

@Injectable()
export class GetAvailableDateService {
  constructor(private readonly concertRepository: ConcertRepositoryPort) {}
}
