import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserTokenRepositoryPort } from './port/user-token.repository.port';
import { JwtManageService } from '../../../domains/users/jwt/jwt.service';
import { UserDomainService } from 'src/domains/users/user.domain.service';
import { UserTokenDomainService } from 'src/domains/users/user-token.domain.service';
import { RedisService } from 'src/infrastructures/common/redis/redis.service';
import { getConcertWatingTokenKey } from 'src/common/libs/get-wating-token-key';

jest.mock('src/common/libs/get-wating-token-key', () => {
  return {
    getConcertWatingTokenKey: jest.fn().mockReturnValue('key'),
  };
});
describe('UserService', () => {
  let service: UserService;
  let userRepositoryPort: UserTokenRepositoryPort;

  let jwtService: JwtManageService;
  let userTokenDomainService: UserTokenDomainService;

  let redisService: RedisService;

  let userId: number = 1;

  beforeEach(async () => {
    userRepositoryPort = {
      getAll: jest.fn().mockResolvedValue([]),
      getUserTokenByUserId: jest.fn().mockResolvedValue(null),
      create: jest.fn().mockResolvedValue({ id: 1, userId: 1 }),
    };

    jwtService = {
      sign: jest.fn().mockReturnValue('token'),
      getEntryTime: jest.fn().mockReturnValue(new Date()),
      getExpiredAt: jest.fn().mockReturnValue(new Date()),
    } as any;

    let redis: any = {};
    redisService = new RedisService(redis);

    redisService.addQueue = jest.fn().mockResolvedValue(true);
    redisService.getCount = jest.fn().mockResolvedValue(0);

    userTokenDomainService = {
      getWaitingCount: jest.fn().mockReturnValue(0),
    };

    service = new UserService(jwtService, redisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getOrCreate', () => {
    it('should call sign', async () => {
      await service.getOrCreate(userId);
      expect(jwtService.sign).toBeCalled();
    });
  });
});
