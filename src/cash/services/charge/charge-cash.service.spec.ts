import { Test, TestingModule } from '@nestjs/testing';
import { ChargeCashService } from './charge-cash.service';
import { User } from '@prisma/client';
import { CashLogRepositoryPort, UserRepositoryPort } from '../port/cash.port';

describe('ChargeCashService', () => {
  let chargeService: ChargeCashService;

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
    chargeService = new ChargeCashService(
      cashRepositoryPort,
      userRepositoryPort,
    );
  });

  it('should be defined', () => {
    expect(chargeService).toBeDefined();
  });

  describe('chargeCashService', () => {
    it('should be defined', () => {
      expect(chargeService.chargeCash).toBeDefined();
      expect(chargeService.validate).toBeDefined();
    });

    describe('validate', () => {
      it('if user is found and cash is positive, return void', () => {
        user = { id: 1 } as User;

        expect(() => chargeService.validate(1000, user)).not.toThrow();
      });

      it('if user is not found, throw error', () => {
        expect(() => chargeService.validate(-1, null)).toThrowError(
          'user not found',
        );
      });

      it('if cash is not positive, throw error', () => {
        user = { id: 1 } as User;

        expect(() => chargeService.validate(0, user)).toThrowError(
          'cash must be positive',
        );
      });
    });

    describe('chargeCash', () => {
      it('should charge cash', async () => {
        const result = await chargeService.chargeCash(1, 1000);
      });
    });
  });
});
