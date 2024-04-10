import { Test, TestingModule } from '@nestjs/testing';
import { ChargeCashService } from './cash.service';
import { User } from '@prisma/client';
import { CashLogRepositoryPort, UserRepositoryPort } from './port/cash.port';

describe('CashService', () => {
  let service: ChargeCashService;
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
    service = new ChargeCashService(cashRepositoryPort, userRepositoryPort);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('chargeCashService', () => {
    it('should be defined', () => {
      expect(service.chargeCash).toBeDefined();
      expect(service.validate).toBeDefined();
    });

    describe('validate', () => {
      it('if user is found and cash is positive, return void', () => {
        user = { id: 1 } as User;

        expect(() => service.validate(1000, user)).not.toThrow();
      });

      it('if user is not found, throw error', () => {
        expect(() => service.validate(-1, null)).toThrowError('user not found');
      });

      it('if cash is not positive, throw error', () => {
        user = { id: 1 } as User;

        expect(() => service.validate(0, user)).toThrowError(
          'cash must be positive',
        );
      });
    });

    describe('chargeCash', () => {
      it('should charge cash', async () => {
        const result = await service.chargeCash(1, 1000);
      });
    });
  });
});
