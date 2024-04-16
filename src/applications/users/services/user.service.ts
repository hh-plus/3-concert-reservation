import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { UserRepositoryPort } from './port/user.repository.port';

import { JwtManageService } from '../../../domains/users/jwt/jwt.service';
import { UserToken } from '@prisma/client';
import { UserDomainService } from 'src/domains/users/user.domain.service';
import { UserValidateService } from 'src/domains/users/validate/user.validate.service';

@Injectable()
export class UserService {
  private passCount = 10;
  constructor(
    private readonly userRepositoryPort: UserRepositoryPort,
    private readonly userDomainService: UserDomainService,
    private readonly jwtManageService: JwtManageService,
  ) {}

  public async getOrCreate(
    userId: number,
    token: string | null,
  ): Promise<{ token?: string; waitingNumber: number }> {
    const existUserToken = await this.userRepositoryPort.getUserTokenByUserId(
      userId,
    );

    let result: { token?: string; waitingNumber: number } = {
      waitingNumber: 0,
    };
    if (existUserToken) {
      UserValidateService.validate(existUserToken, token);
    }
    if (!existUserToken) {
    }

    return result;
  }
}
