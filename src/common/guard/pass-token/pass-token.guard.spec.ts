import { JwtService } from '@nestjs/jwt';
import { PassTokenGuard } from './pass-token.guard';
import { RedisService } from 'src/infrastructures/common/redis/redis.service';
import { getConcertActiveTokenKey } from 'src/common/libs/get-wating-token-key';

jest.mock('src/common/libs/get-wating-token-key', () => {
  return {
    getConcertWatingTokenKey: jest.fn().mockReturnValue('key'),
    getConcertActiveTokenKey: jest.fn().mockReturnValue('key'),
  };
});
describe('PassTokenGuard', () => {
  let jwtService: JwtService;
  let passTokenGuard: PassTokenGuard;
  let redisService: any;

  beforeEach(() => {
    jwtService = {
      verifyAsync: jest.fn(),
    } as any;

    redisService = {
      getRanking: jest.fn().mockResolvedValue(1),
    };

    passTokenGuard = new PassTokenGuard(jwtService, redisService);
  });

  it('should be defined', () => {
    expect(passTokenGuard).toBeDefined();
  });

  describe('canActivate', () => {
    let request = {
      headers: {
        authorization: 'Bearer token',
      },
    };
    const context = {
      switchToHttp: () => ({
        getRequest: () => request,
      }),
    };

    it('should be defined', () => {
      expect(passTokenGuard.canActivate).toBeDefined();
    });

    it('if type is not Bearer or token is not exist, throw error', async () => {
      await expect(passTokenGuard.canActivate(context as any)).resolves.toBe(
        true,
      );
    });

    it('if token is not exist, throw error', async () => {
      request.headers.authorization = 'Bearer';
      await expect(
        passTokenGuard.canActivate(context as any),
      ).rejects.toThrow();
    });

    it('if type is not Bearer, throw error', async () => {
      request.headers.authorization = 'Test token';
      await expect(
        passTokenGuard.canActivate(context as any),
      ).rejects.toThrow();
    });

    it('if jwtService.verifyAsync throw error, throw error', async () => {
      jwtService.verifyAsync = jest.fn().mockRejectedValue(new Error());
      await expect(
        passTokenGuard.canActivate(context as any),
      ).rejects.toThrow();
    });
  });
});
