import { Test, TestingModule } from '@nestjs/testing';
import { UserTokenService } from './get-user-token.service';
import { UserRepositoryPort } from './port/user.repository.port';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from '@prisma/client';
import { JwtManageService } from './jwt.service';

describe('UserService', () => {
  let service: UserTokenService;
  let userRepositoryPort: UserRepositoryPort;
  let jwtService: JwtManageService;

  beforeEach(async () => {
    userRepositoryPort = {
      getOneByUserId: jest.fn(async (userId: number): Promise<UserToken> => {
        return {
          id: 1,
          token: 'token',
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      }),
      getAll: jest.fn().mockResolvedValue([]),
      create: jest.fn(),
      getCountByUserTokenId: jest.fn(),
    };

    jwtService = {
      sign: jest.fn().mockReturnValue('token'),
    } as any;

    service = new UserTokenService(jwtService, userRepositoryPort);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getOrCreate', () => {
    it('getUserToken을 호출한다.', () => {
      service.getOrCreate(1);
      expect(userRepositoryPort.getOneByUserId).toBeCalled();
    });

    it('token이 없으면 새로운 token을 생성한다.', async () => {
      userRepositoryPort.getOneByUserId = jest.fn().mockResolvedValue(null);
      service.createNewToken = jest.fn().mockReturnValue('token');

      await service.getOrCreate(1);
      expect(userRepositoryPort.getAll).toBeCalled();
      expect(service.createNewToken).toBeCalled();
      expect(userRepositoryPort.create).toBeCalled();
    });
  });
});
