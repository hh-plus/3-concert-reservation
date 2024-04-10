import { User } from '@prisma/client';
import { CashLogRepositoryPort, UserRepositoryPort } from '../port/cash.port';
import { GetOneCashService } from './get-one.service';

describe('GetOneCashService', () => {
  let getOneCashService: GetOneCashService;

  let user: User;
  let cashRepositoryPort: CashLogRepositoryPort;
  let userRepositoryPort: UserRepositoryPort;

  beforeEach(async () => {
    cashRepositoryPort = {
      getOne: jest.fn().mockResolvedValue({ id: 1, userId: 1 }),
      create: jest.fn(),
    };

    userRepositoryPort = {
      getOne: jest.fn().mockResolvedValue({ id: 1 } as User),
    };
    getOneCashService = new GetOneCashService(
      cashRepositoryPort,
      userRepositoryPort,
    );
  });

  it('should be defined', () => {
    expect(getOneCashService).toBeDefined();
    expect(getOneCashService.getOne).toBeDefined();
    expect(getOneCashService.validate).toBeDefined();
  });

  describe('validate', () => {
    it('if user is found, return void', () => {
      user = { id: 1 } as User;

      expect(() => getOneCashService.validate(user)).not.toThrow();
    });

    it('if user is not found, throw error', () => {
      expect(() => getOneCashService.validate(null)).toThrowError(
        'user not found',
      );
    });
  });

  describe('getOne', () => {
    it('should get one cash', async () => {
      user = { id: 1 } as User;

      await getOneCashService.getOne(1);
      expect(userRepositoryPort.getOne).toBeCalledWith(1);
    });

    it('should return cash', async () => {
      user = { id: 1 } as User;

      const result = await getOneCashService.getOne(1);
      expect(result).toHaveProperty('cash');
    });
  });
});
