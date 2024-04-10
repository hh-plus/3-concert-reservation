import { JwtService } from '@nestjs/jwt';
import { PassTokenGuard } from './pass-token.guard';

describe('PassTokenGuard', () => {
  let jwtService: JwtService;
  let passTokenGuard: PassTokenGuard;

  beforeEach(() => {
    jwtService = {
      verifyAsync: jest.fn(),
    } as any;

    passTokenGuard = new PassTokenGuard(jwtService);
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
