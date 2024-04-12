import { Test, TestingModule } from '@nestjs/testing';
import { ConcertService } from './concert.service';
import { ConcertRepositoryPort } from '../adapters/concert.repository.port';

describe('ConcertService', () => {
  let service: ConcertService;
  let concertRepositoryPort: ConcertRepositoryPort;

  beforeEach(async () => {
    concertRepositoryPort = {
      getAvailableDate: jest.fn(),
    };

    service = new ConcertService(concertRepositoryPort);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getAvailableDate', () => {
    const concertId = 1;
    service.getAvailableDate(concertId);
    expect(concertRepositoryPort.getAvailableDate).toBeCalledWith(concertId);
  });
});
