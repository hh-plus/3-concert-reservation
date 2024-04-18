import { ConflictException, Inject, Injectable, Logger } from '@nestjs/common';
import { UserTokenRepositoryPort } from './port/user-token.repository.port';

import { JwtManageService } from '../../../domains/users/jwt/jwt.service';
import { UserToken } from '@prisma/client';
import { UserDomainService } from 'src/domains/users/user.domain.service';
import { UserValidateService } from 'src/domains/users/validate/user.validate.service';
import { checkExistUserToken } from 'src/domains/users/validate/user-token.validate';
import { UserTokenDomainService } from 'src/domains/users/user-token.domain.service';

@Injectable()
export class UserService {
  constructor(
    @Inject('userTokenRepositoryPort')
    private readonly userRepositoryPort: UserTokenRepositoryPort,
    private readonly userDomainService: UserDomainService,
    private readonly jwtManageService: JwtManageService,
    private readonly userTokenDomainService: UserTokenDomainService,
  ) {}

  public async getOrCreate(userId: number): Promise<{ token: string }> {
    const existUserToken = await this.userRepositoryPort.getUserTokenByUserId(
      userId,
    );

    checkExistUserToken(existUserToken);

    const tokens = await this.userRepositoryPort.getAll();
    const waitingNumber = this.userTokenDomainService.getWaitingCount(tokens);

    const entryTime = this.jwtManageService.getEntryTime(waitingNumber);

    const token = this.jwtManageService.sign({
      userId,
      entryTime,
      waitingNumber,
    });

    await this.userRepositoryPort.create(
      userId,
      entryTime,
      this.jwtManageService.getExpiredAt(entryTime),
    );

    return {
      token,
    };
  }
}
