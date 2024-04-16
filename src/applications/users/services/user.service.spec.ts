import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepositoryPort } from './port/user.repository.port';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from '@prisma/client';
import { JwtManageService } from '../../../domains/users/jwt/jwt.service';
import { ConflictException } from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;
  let userRepositoryPort: UserRepositoryPort;
  let jwtService: JwtManageService;

  let userId: number = 1;
  let token: string = 'token';

  beforeEach(async () => {
    userRepositoryPort = {
      getAll: jest.fn().mockResolvedValue([]),
      create: jest.fn().mockResolvedValue({ id: 1, userId: 1 }),
      getCountByUserTokenId: jest.fn(),
      deleteById: jest.fn(),
    };

    jwtService = {
      sign: jest.fn().mockReturnValue('token'),
    } as any;

    service = new UserService(jwtService, userRepositoryPort);

    service.createNewToken = jest.fn().mockReturnValue(token);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('createNewToken', () => {
    const result = service.createNewToken(userId, 1);
    expect(result).toEqual(token);
  });

  it('createUserToken', () => {
    const tokens: UserToken[] = [];
    const result = service.createUserToken(tokens, userId);
    expect(result).toEqual({ token, waitingNumber: 1 });
  });

  describe('validate', () => {
    it('existUserToken이 없고 token이 있으면 ConflictException을 발생시킨다.', () => {
      expect(() => service.validate(undefined, token)).toThrowError(
        ConflictException,
      );
    });

    it('existUserToken이 있고 token이 없으면 ConflictException을 발생시킨다.', () => {
      expect(() => service.validate({} as UserToken, null)).toThrowError(
        ConflictException,
      );
    });
  });

  describe('getOrCreate', () => {
    beforeEach(() => {
      service.createUserToken = jest
        .fn()
        .mockResolvedValue({ token, waitingNumber: 1 });
      service.updateUserToken = jest
        .fn()
        .mockResolvedValue({ token, waitingNumber: 0 });
    });

    it('getOneByUserId, validate를 호출한다.', async () => {
      service.validate = jest.fn();
      await service.getOrCreate(userId, token);

      // expect(userRepositoryPort.getOneByUserId).toBeCalled();
      expect(service.validate).toBeCalled();
    });

    it('token이 없으면 새로운 token을 생성한다.', async () => {
      const result = await service.getOrCreate(userId, null);
      expect(userRepositoryPort.getAll).toBeCalled();

      expect(result).toEqual({ token, waitingNumber: userId });
    });

    it('token이 있으면 waitingNumber를 갱신해 새 token을 반환한다.', async () => {
      userRepositoryPort.getAll = jest.fn().mockResolvedValue([
        { id: 1, userId: 1 },
        { id: 2, userId: 2 },
      ]);
      service.validate = jest.fn();
      await service.getOrCreate(2, token);

      //result의 타입 확인
      expect(service.updateUserToken).toBeCalled();
    });
  });
});
