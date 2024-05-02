import { Inject, Injectable, Logger } from '@nestjs/common';
import { UserTokenRepositoryPort } from './port/user-token.repository.port';

import { JwtManageService } from '../../../domains/users/jwt/jwt.service';

import { checkExistUserToken } from 'src/domains/users/validate/user-token.validate';
import { UserTokenDomainService } from 'src/domains/users/user-token.domain.service';
import { RedisService } from 'src/infrastructures/common/redis/redis.service';

@Injectable()
export class UserService {
  constructor(
    @Inject('userTokenRepositoryPort')
    private readonly userRepositoryPort: UserTokenRepositoryPort,

    private readonly jwtManageService: JwtManageService,
    private readonly userTokenDomainService: UserTokenDomainService,
    private readonly redisService: RedisService,
  ) {}

  public async getOrCreate(userId: number): Promise<{ token: string }> {
    const tokens = await this.userRepositoryPort.getAll();

    // const waitingNumber = this.redisService.getPosition()

    const entryTime = this.jwtManageService.getEntryTime(1);

    const token = this.jwtManageService.sign({
      userId,
      entryTime,
    });

    await this.redisService.joinQueue(token);

    return {
      token,
    };
  }
}
