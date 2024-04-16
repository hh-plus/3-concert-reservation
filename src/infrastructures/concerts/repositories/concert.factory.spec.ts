import { PrismaService } from '@@prisma/prisma.service';
import { ConcertReaderRepository } from './concert.reader.repository';
import { ConcertFactory } from './concert.factory';
import { ConcertMapper } from '../mappers/concert.mapper';
import { ConcertRepository } from './concert.repository';

describe('ConcertUseCase', () => {
  let useCase: ConcertFactory;
  let readerRepository: ConcertReaderRepository;
  let repository: ConcertRepository;
  let prismaService: any;
  beforeEach(() => {
    prismaService = {} as PrismaService;
    readerRepository = new ConcertReaderRepository(prismaService);

    useCase = new ConcertFactory(readerRepository, repository);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });
});
