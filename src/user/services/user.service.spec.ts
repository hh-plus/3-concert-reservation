import { Test, TestingModule } from '@nestjs/testing';
import { GetUserTokenService } from './get-user-token.service';
import { UserRepositoryPort } from './port/user.repository.port';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from '@prisma/client';

describe('UserService', () => {
  let service: GetUserTokenService;
  let userRepositoryPort: UserRepositoryPort;
  let jwtService: JwtService;

  beforeEach(async () => {
    userRepositoryPort = {
      getUserToken: jest.fn(async (userId: number): Promise<UserToken> => {
        return {
          id: 1,
          token: 'token',
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      }),
      createUserToken: jest.fn(),
    };

    service = new GetUserTokenService(userRepositoryPort);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUserToken', () => {
    it('repository의 getUserToken을 호출한다.', () => {
      service.getUserToken(1);
      expect(userRepositoryPort.getUserToken).toBeCalled();
    });
  });

  describe('createUserToken', () => {
    it('repository의 createUserToken을 호출한다.', () => {
      service.createUserToken(1);
      expect(userRepositoryPort.createUserToken).toBeCalled();
    });
  });
});
