import { PrismaService } from '@@prisma/prisma.service';
import { ConcertRepository } from './concert.repository';
import { ConcertFactory } from './concert.factory';
import { ConcertMapper } from '../services/concert.mapper';

describe('ConcertUseCase', () => {
  let useCase: ConcertFactory;
  let repository: ConcertRepository;
  let prismaService: any;
  beforeEach(() => {
    prismaService = {} as PrismaService;
    repository = new ConcertRepository(prismaService);

    useCase = new ConcertFactory(repository);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('getAvailableDate', async () => {
    repository.getConcertsIncludeConcertDate = jest.fn();
    ConcertMapper.mappingAvailableDate = jest.fn();

    await useCase.getAvailableDate(0);
    expect(repository.getConcertsIncludeConcertDate).toBeCalled();
    expect(ConcertMapper.mappingAvailableDate).toBeCalled();
  });
});
