import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepositoryPort } from './port/user.repository.port';

import { JwtManageService } from './jwt.service';
import { UserToken } from '@prisma/client';

@Injectable()
export class UserTokenService {
  constructor(
    private readonly jwtManageService: JwtManageService,
    private readonly userRepositoryPort: UserRepositoryPort,
  ) {}

  public validate(existUserToken: UserToken | null, token: string | null) {
    if (!existUserToken && token)
      throw new ConflictException('유효하지 않은 Token 입니다.');

    if (existUserToken && !token) {
      this.userRepositoryPort.deleteById(existUserToken.id);
      throw new ConflictException('유효하지 않은 요청입니다.');
    }
  }

  public createNewToken(userId: number, waitingNumber: number) {
    const payload = { userId, waitingNumber };
    return this.jwtManageService.sign(payload);
  }

  public async getOrCreate(userId: number, token: string | null) {
    const existUserToken: UserToken | null =
      await this.userRepositoryPort.getOneByUserId(userId);

    this.validate(existUserToken, token);

    if (!existUserToken) {
      const tokens = await this.userRepositoryPort.getAll();

      this.createNewToken(userId, tokens.length + 1);

      await this.userRepositoryPort.create(userId);
    }
    if (existUserToken) {
      return existUserToken;
    }
  }
}
