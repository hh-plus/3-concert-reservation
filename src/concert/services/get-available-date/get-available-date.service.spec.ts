import { Test, TestingModule } from '@nestjs/testing';
import { GetAvailableDateService } from './get-available-date.service';
import { ConcertRepositoryPort } from '../port/concert.repository.port';

describe('GetAvailableDateService', () => {
  let service: GetAvailableDateService;
  let concertRepositoryPort: ConcertRepositoryPort;
  let concertId: number = 1;
  beforeEach(async () => {
    concertRepositoryPort = {
      getAvailableDate: jest.fn().mockResolvedValue([{ date: new Date() }]),
    };
    service = new GetAvailableDateService(concertRepositoryPort);
  });

  it('should be defined', () => {
    expect(service.getAvailableDate).toBeDefined();
  });

  it('should call getAvailableDate in repository ', () => {
    service.getAvailableDate(concertId);
    expect(concertRepositoryPort.getAvailableDate).toBeCalled();
  });
});
