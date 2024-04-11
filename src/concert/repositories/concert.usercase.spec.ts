import { PrismaService } from 'prisma/prisma.service';
import { ConcertRepository } from './concert.repository';
import { ConcertUseCase } from './concert.use-case';

describe('ConcertUsecase', () => {
  let concertUsecase: ConcertUseCase;
  let concertRepository: ConcertRepository;

  let concertId: number = 1;

  beforeEach(async () => {
    concertRepository = new ConcertRepository({} as PrismaService);

    concertRepository.getAvailableDate = jest.fn().mockResolvedValue({
      ConcertDate: [
        {
          date: '2021-07-01T00:00:00.000Z',
          ConcertDateUser: [
            {
              id: 1,
            },
          ],
        },
      ],
    });
    concertUsecase = new ConcertUseCase(concertRepository);
  });

  it('should be defined', () => {
    expect(concertUsecase.getAvailableDate).toBeDefined();
  });

  it('should call getAvailableDate in repository ', () => {
    concertUsecase.getAvailableDate(concertId);
    expect(concertRepository.getAvailableDate).toBeCalled();
  });

  it('should return available date', async () => {
    concertRepository.getAvailableDate = jest.fn().mockResolvedValue({
      ConcertDate: [
        {
          date: '2021-07-01T00:00:00.000Z',
          ConcertDateUser: [
            {
              id: 1,
            },
          ],
        },
      ],
      maxSeats: 12,
    });

    const result = await concertUsecase.getAvailableDate(concertId);
    expect(result).toEqual(['2021-07-01T00:00:00.000Z']);
  });
});
