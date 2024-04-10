import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { UserRepositoryPort } from './port/user.repository.port';

import { JwtManageService } from './jwt.service';
import { UserToken } from '@prisma/client';

@Injectable()
export class UserTokenService {
  private passCount = 10;
  constructor(
    private readonly jwtManageService: JwtManageService,
    private readonly userRepositoryPort: UserRepositoryPort,
  ) {}

  public validate(existUserToken: UserToken | undefined, token: string | null) {
    if (!existUserToken && token)
      throw new ConflictException('유효하지 않은 Token 입니다.');

    if (existUserToken && !token) {
      throw new ConflictException('유효하지 않은 요청입니다.');
    }
  }

  public createNewToken(userId: number, waitingNumber: number) {
    const payload = { userId, waitingNumber };
    return this.jwtManageService.sign(payload);
  }

  public createUserToken(tokens: UserToken[], userId: number) {
    this.userRepositoryPort.create(userId).catch((err) => {
      Logger.error(err);
    });
    return {
      token: this.createNewToken(userId, tokens.length + 1),
      waitingNumber: tokens.length + 1,
    };
  }

  public updateUserToken(tokens: UserToken[], userId: number) {
    const tokenIdx = tokens.findIndex((token) => token.userId === userId);

    if (tokens[tokenIdx].isPass) {
      return { token: this.createNewToken(userId, 0), waitingNumber: 0 };
    }

    return {
      token: this.createNewToken(userId, tokenIdx + 1),
      waitingNumber: tokenIdx + 1,
    };
  }

  public async getOrCreate(
    userId: number,
    token: string | null,
  ): Promise<{ token: string; waitingNumber: number }> {
    const tokens = await this.userRepositoryPort.getAll();

    const existUserToken: UserToken | undefined = tokens.find(
      (userToken) => userToken.userId === userId,
    );

    this.validate(existUserToken, token);

    let result = { token: '', waitingNumber: 0 };

    if (!existUserToken) {
      result = this.createUserToken(tokens, userId);
    }
    if (existUserToken) {
      result = this.updateUserToken(tokens, userId);
    }
    return result;
  }
}
