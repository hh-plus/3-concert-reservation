import { PrismaService } from '@@prisma/prisma.service';
import { ConcertRepository } from '../repositories/concert.repository';
import { ConcertUseCase } from './concert.use-case';
import { ConcertMapper } from './concert.mapper';

describe('ConcertUseCase', () => {
  let useCase: ConcertUseCase;
  let repository: ConcertRepository;
  let prismaService: any;
  beforeEach(() => {
    prismaService = {} as PrismaService;
    repository = new ConcertRepository(prismaService);

    useCase = new ConcertUseCase(repository);
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
