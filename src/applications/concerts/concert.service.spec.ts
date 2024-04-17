import { Test, TestingModule } from '@nestjs/testing';
import { ConcertService } from './concert.service';
import { ConcertRepositoryPort } from './adapters/concert.repository.port';
import { ConcertDomainService } from 'src/domains/concerts/concert.domain.service';

describe('ConcertService', () => {
  let service: ConcertService;
  let concertRepositoryPort: ConcertRepositoryPort;
  let concertDomainService: ConcertDomainService;

  beforeEach(async () => {
    concertRepositoryPort = {
      getConcertById: jest.fn().mockResolvedValue({ id: 1 }),
      getConcertDateById: jest.fn().mockResolvedValue({ id: 1 }),
      getConcertDatesByConcertId: jest.fn().mockResolvedValue([]),
      getConcertDateUsersByConcertDateId: jest.fn().mockResolvedValue([]),
      getConcertDateUserByConcertDateIdAndSeat: jest.fn(),
      createConcertDateUser: jest.fn(),
    };

    concertDomainService = {
      getAvailableDate: jest.fn(),
      getAvailableSeats: jest.fn(),
    };

    service = new ConcertService(concertRepositoryPort, concertDomainService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAvailableDate', () => {
    it('repository의 메서드를 호출해야한다.', async () => {
      const concertId = 1;
      concertRepositoryPort.getConcertById = jest.fn().mockResolvedValue({
        id: concertId,
      });

      await service.getAvailableDate(concertId);
      expect(concertRepositoryPort.getConcertById).toBeCalledWith(concertId);
      expect(concertRepositoryPort.getConcertDatesByConcertId).toBeCalledWith(
        concertId,
      );
      expect(
        concertRepositoryPort.getConcertDateUsersByConcertDateId,
      ).toBeCalledWith([]);
    });

    it('concert이 없으면 NotFoundException을 던져야한다.', async () => {
      const concertId = 1;
      concertRepositoryPort.getConcertById = jest.fn().mockResolvedValue(null);

      await expect(service.getAvailableDate(concertId)).rejects.toThrow();
    });

    it('domainService의 메서드를 호출해야한다.', async () => {
      const concertId = 1;
      concertRepositoryPort.getConcertById = jest.fn().mockResolvedValue({
        id: concertId,
      });

      await service.getAvailableDate(concertId);
      expect(concertDomainService.getAvailableDate).toBeCalled();
    });
  });

  describe('getAvailableSeats', () => {
    it('should be defined', () => {
      expect(service.getAvailableSeats).toBeDefined();
    });

    it('repository를 호출해야한다.', async () => {
      const concertId = 1;
      const concertDateId = 1;
      await service.getAvailableSeats(concertId, concertDateId);
      expect(concertRepositoryPort.getConcertById).toBeCalledWith(concertId);
      expect(concertRepositoryPort.getConcertDateById).toBeCalledWith(
        concertId,
      );
      expect(
        concertRepositoryPort.getConcertDateUsersByConcertDateId,
      ).toBeCalledWith(concertDateId);
    });
  });
});