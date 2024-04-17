import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserTokenRepositoryPort } from './port/user-token.repository.port';
import { JwtManageService } from '../../../domains/users/jwt/jwt.service';
import { UserDomainService } from 'src/domains/users/user.domain.service';
import { UserTokenDomainService } from 'src/domains/users/user-token.domain.service';

describe('UserService', () => {
  let service: UserService;
  let userRepositoryPort: UserTokenRepositoryPort;
  let userDomainService: UserDomainService;
  let jwtService: JwtManageService;
  let userTokenDomainService: UserTokenDomainService;

  let userId: number = 1;

  beforeEach(async () => {
    userRepositoryPort = {
      getAll: jest.fn().mockResolvedValue([]),
      getUserTokenByUserId: jest.fn().mockResolvedValue({ id: 1 }),
      create: jest.fn().mockResolvedValue({ id: 1, userId: 1 }),
    };

    jwtService = {
      sign: jest.fn().mockReturnValue('token'),
      getEntryTime: jest.fn().mockReturnValue(new Date()),
      getExpiredAt: jest.fn().mockReturnValue(new Date()),
    } as any;

    userTokenDomainService = {
      getWaitingCount: jest.fn().mockReturnValue(0),
    };

    service = new UserService(
      userRepositoryPort,
      userDomainService,
      jwtService,
      userTokenDomainService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getOrCreate', () => {
    it('should call getUserTokenByUserId', async () => {
      await service.getOrCreate(userId);
      expect(userRepositoryPort.getUserTokenByUserId).toBeCalled();
    });

    it('should call checkExistUserToken', async () => {
      await service.getOrCreate(userId);
      expect(userRepositoryPort.getUserTokenByUserId).toBeCalled();
    });

    it('should call getAll', async () => {
      await service.getOrCreate(userId);
      expect(userRepositoryPort.getAll).toBeCalled();
    });

    it('should call getWaitingCount', async () => {
      await service.getOrCreate(userId);
      expect(userTokenDomainService.getWaitingCount).toBeCalled();
    });

    it('should call sign', async () => {
      await service.getOrCreate(userId);
      expect(jwtService.sign).toBeCalled();
    });
  });
});
