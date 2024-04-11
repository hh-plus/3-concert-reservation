import { Test, TestingModule } from '@nestjs/testing';
import { GetAvailableDateService } from './get-available-date.service';
import { ConcertRepositoryPort } from '../port/concert.repository.port';

describe('GetAvailableDateService', () => {
  let service: GetAvailableDateService;
  let concertRepositoryPort: ConcertRepositoryPort;

  beforeEach(async () => {
    service = new GetAvailableDateService(concertRepositoryPort);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
