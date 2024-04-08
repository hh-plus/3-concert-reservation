import { Test, TestingModule } from '@nestjs/testing';
import { UserTokenService } from './get-user-token.service';
import { UserRepositoryPort } from './port/user.repository.port';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from '@prisma/client';

describe('UserService', () => {
  let service: UserTokenService;
  let userRepositoryPort: UserRepositoryPort;
  let jwtService: JwtService;

  beforeEach(async () => {
    userRepositoryPort = {
      getOne: jest.fn(async (userId: number): Promise<UserToken> => {
        return {
          id: 1,
          token: 'token',
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      }),
      getAll: jest.fn(),
      create: jest.fn(),
    };

    service = new UserTokenService(userRepositoryPort);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUserToken', () => {
    it('repository의 getUserToken을 호출한다.', () => {
      service.getOneByUserId(1);
      expect(userRepositoryPort.getOne).toBeCalled();
    });
  });

  describe('createUserToken', () => {
    it('repository의 createUserToken을 호출한다.', () => {
      service.create(1);
      expect(userRepositoryPort.create).toBeCalled();
    });
  });

  describe('createNewToken', () => {
    it('jwt token을 생성한다.', () => {});
  });

  describe('getOrCreate', () => {
    it('getUserToken을 호출한다.', () => {
      service.getOrCreate(1);
      expect(userRepositoryPort.getOne).toBeCalled();
    });

    it('token이 없으면 새로운 token을 생성한다.', () => {
      jest.spyOn(service, 'getOneByUserId').mockResolvedValue(null);
      service.getOrCreate(1);
      expect(userRepositoryPort.create).toBeCalled();
    });
  });
});
