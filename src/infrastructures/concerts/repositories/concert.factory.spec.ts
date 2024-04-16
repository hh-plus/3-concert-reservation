import { PrismaService } from '@@prisma/prisma.service';
import { ConcertReaderRepository } from './concert.reader.repository';
import { ConcertFactory } from './concert.factory';
import { ConcertMapper } from '../mappers/concert.mapper';

describe('ConcertUseCase', () => {
  let useCase: ConcertFactory;
  let repository: ConcertReaderRepository;
  let prismaService: any;
  beforeEach(() => {
    prismaService = {} as PrismaService;
    repository = new ConcertReaderRepository(prismaService);

    useCase = new ConcertFactory(repository);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });
});
