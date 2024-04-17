import { PrismaService } from '@@prisma/prisma.service';
import { ConcertReaderRepository } from './concert.reader.repository';
import { ConcertFactory } from './concert.factory';
import { ConcertMapper } from '../mappers/concert.mapper';
import { ConcertRepository } from './concert.repository';

describe('ConcertUseCase', () => {
  let concertFactory: ConcertFactory;
  let readerRepository: ConcertReaderRepository;
  let repository: ConcertRepository;
  let prismaService: any;
  beforeEach(() => {
    prismaService = {} as PrismaService;
    readerRepository = new ConcertReaderRepository(prismaService);
    repository = new ConcertRepository(prismaService);

    concertFactory = new ConcertFactory(readerRepository, repository);
  });

  describe('getConcertById', () => {
    it('should call repository method', async () => {
      const concertId = 1;
      readerRepository.getConcertById = jest
        .fn()
        .mockResolvedValue({ id: concertId });

      await concertFactory.getConcertById(concertId);
      expect(readerRepository.getConcertById).toBeCalled;
    });

    it('should return null if concert is not found', async () => {
      const concertId = 1;
      readerRepository.getConcertById = jest.fn().mockResolvedValue(null);

      const result = await concertFactory.getConcertById(concertId);
      expect(result).toBeNull();
    });

    it('should return concert if concert is found', async () => {
      const concertId = 1;
      readerRepository.getConcertById = jest
        .fn()
        .mockResolvedValue({ id: concertId });
      ConcertMapper.convertingConcert = jest
        .fn()
        .mockReturnValue({ id: concertId });

      const result = await concertFactory.getConcertById(concertId);

      expect(result).toEqual({ id: concertId });
    });
  });

  describe('getConcertDateById', () => {
    it('should call repository method', async () => {
      const concertDateId = 1;
      readerRepository.getConcertDateById = jest
        .fn()
        .mockResolvedValue({ id: concertDateId });

      await concertFactory.getConcertDateById(concertDateId);
      expect(readerRepository.getConcertDateById).toBeCalled;
    });

    it('should return null if concert date is not found', async () => {
      const concertDateId = 1;
      readerRepository.getConcertDateById = jest.fn().mockResolvedValue(null);

      const result = await concertFactory.getConcertDateById(concertDateId);
      expect(result).toBeNull();
    });

    it('should return concert date if concert date is found', async () => {
      const concertDateId = 1;
      readerRepository.getConcertDateById = jest
        .fn()
        .mockResolvedValue({ id: concertDateId });
      ConcertMapper.convertingConcertDate = jest
        .fn()
        .mockReturnValue({ id: concertDateId });

      const result = await concertFactory.getConcertDateById(concertDateId);

      expect(result).toEqual({ id: concertDateId });
    });
  });

  describe('getConcertDatesByConcertId', () => {
    it('should call repository method', async () => {
      const concertId = 1;
      readerRepository.getConcertsDateByConcertId = jest
        .fn()
        .mockResolvedValue([{ id: concertId }]);

      await concertFactory.getConcertDatesByConcertId(concertId);
      expect(readerRepository.getConcertsDateByConcertId).toBeCalled;
    });

    it('should return empty array if concert dates are not found', async () => {
      const concertId = 1;
      readerRepository.getConcertsDateByConcertId = jest
        .fn()
        .mockResolvedValue([]);

      const result = await concertFactory.getConcertDatesByConcertId(concertId);
      expect(result).toEqual([]);
    });

    it('should return concert dates if concert dates are found', async () => {
      const concertId = 1;
      readerRepository.getConcertsDateByConcertId = jest
        .fn()
        .mockResolvedValue([{ id: concertId }]);
      ConcertMapper.mappingConcertDates = jest
        .fn()
        .mockReturnValue([{ id: concertId }]);

      const result = await concertFactory.getConcertDatesByConcertId(concertId);

      expect(result).toEqual([{ id: concertId }]);
    });
  });

  describe('getConcertDateUsersByConcertDateId', () => {
    it('should call repository method', async () => {
      const concertDateId = 1;
      readerRepository.getConcertDateUserByConcertDateIds = jest
        .fn()
        .mockResolvedValue([{ id: concertDateId }]);

      await concertFactory.getConcertDateUsersByConcertDateId(concertDateId);
      expect(readerRepository.getConcertDateUserByConcertDateIds).toBeCalled;
    });

    it('should return empty array if concert date users are not found', async () => {
      const concertDateId = 1;
      readerRepository.getConcertDateUserByConcertDateIds = jest
        .fn()
        .mockResolvedValue([]);

      const result = await concertFactory.getConcertDateUsersByConcertDateId(
        concertDateId,
      );
      expect(result).toEqual([]);
    });

    it('should return concert date users if concert date users are found', async () => {
      const concertDateId = 1;
      readerRepository.getConcertDateUserByConcertDateIds = jest
        .fn()
        .mockResolvedValue([{ id: concertDateId }]);
      ConcertMapper.mappingConcertDateUsers = jest
        .fn()
        .mockReturnValue([{ id: concertDateId }]);

      const result = await concertFactory.getConcertDateUsersByConcertDateId(
        concertDateId,
      );

      expect(result).toEqual([{ id: concertDateId }]);
    });
  });

  describe('getConcertDateUserByConcertDateIdAndSeat', () => {
    it('should call repository method', async () => {
      const concertDateId = 1;
      const seat = 1;
      readerRepository.getConcertDateUserBy = jest
        .fn()
        .mockResolvedValue({ id: concertDateId });

      await concertFactory.getConcertDateUserByConcertDateIdAndSeat(
        concertDateId,
        seat,
      );
      expect(readerRepository.getConcertDateUserBy).toBeCalled;
    });

    it('should return null if concert date user is not found', async () => {
      const concertDateId = 1;
      const seat = 1;
      readerRepository.getConcertDateUserBy = jest.fn().mockResolvedValue(null);

      const result =
        await concertFactory.getConcertDateUserByConcertDateIdAndSeat(
          concertDateId,
          seat,
        );
      expect(result).toBeNull();
    });

    it('should return concert date user if concert date user is found', async () => {
      const concertDateId = 1;
      const seat = 1;
      readerRepository.getConcertDateUserBy = jest
        .fn()
        .mockResolvedValue({ id: concertDateId });
      ConcertMapper.convertingConcertDateUser = jest
        .fn()
        .mockReturnValue({ id: concertDateId });

      const result =
        await concertFactory.getConcertDateUserByConcertDateIdAndSeat(
          concertDateId,
          seat,
        );

      expect(result).toEqual({ id: concertDateId });
    });
  });

  describe('createConcertDateUser', () => {
    it('should call repository method', async () => {
      const concertDateId = 1;
      const userId = 1;
      const seat = 1;
      const expiredAt = new Date();
      repository.createConcertDateUser = jest.fn();

      await concertFactory.createConcertDateUser(
        concertDateId,
        userId,
        seat,
        expiredAt,
      );
      expect(repository.createConcertDateUser).toBeCalled;
    });
  });
});
