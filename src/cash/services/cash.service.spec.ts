import { Test, TestingModule } from '@nestjs/testing';
import { ChargeCashService } from './cash.service';
import { User } from '@prisma/client';
import { CashRepositoryPort } from './port/cash.port';

describe('CashService', () => {
  let service: ChargeCashService;
  let user: User;
  let cashRepositoryPort: CashRepositoryPort;

  beforeEach(async () => {
    cashRepositoryPort = {
      getCash: jest.fn().mockResolvedValue(10000),
      chargeCash: jest.fn(),
    };

    service = new ChargeCashService(cashRepositoryPort);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('chargeCash', () => {
    it('should be defined', () => {
      expect(service.chargeCash).toBeDefined();
      expect(service.validate).toBeDefined();
    });

    it('validate', () => {
      expect(() => service.validate(-1, null)).toThrowError('user not found');
      user = { id: 1 } as User;

      expect(() => service.validate(0, user)).toThrowError(
        'cash must be positive',
      );
    });
  });
});
