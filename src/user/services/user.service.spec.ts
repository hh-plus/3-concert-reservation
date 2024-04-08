import { Test, TestingModule } from '@nestjs/testing';
import { GetUserTokenService } from './get-user-token.service';
import { UserRepositoryPort } from './port/user.repository.port';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from '@prisma/client';

describe('UserService', () => {
  let service: GetUserTokenService;
  let userRepositoryPort: UserRepositoryPort;
  let jwtService: JwtService;

  type tokenPayload = {
    userId: number;

    concertDateId: number;
    waitingNumber: number;
  };

  beforeEach(async () => {
    let payLoad: tokenPayload = {
      userId: 1,

      concertDateId: 1,
      waitingNumber: 0,
    };

    userRepositoryPort = {
      getUserToken: jest.fn(async (userId: number): Promise<UserToken> => {
        return {
          id: 1,
          token: await Promise.resolve(jwtService.signAsync(payLoad)),
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      }),
    };

    service = new GetUserTokenService(userRepositoryPort);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
