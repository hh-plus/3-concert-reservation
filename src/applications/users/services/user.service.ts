import { Inject, Injectable, Logger } from '@nestjs/common';
import { UserTokenRepositoryPort } from './port/user-token.repository.port';

import { JwtManageService } from '../../../domains/users/jwt/jwt.service';

import { checkExistUserToken } from 'src/domains/users/validate/user-token.validate';
import { UserTokenDomainService } from 'src/domains/users/user-token.domain.service';
import { RedisService } from 'src/infrastructures/common/redis/redis.service';
import { getConcertWatingTokenKey } from 'src/common/libs/get-wating-token-key';

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
    // const waitingNumber = this.redisService.getPosition()

    const waitingCount = await this.redisService.getCount(
      getConcertWatingTokenKey(),
    );
    console.log(waitingCount);
    const entryTime = this.jwtManageService.getEntryTime(waitingCount);

    const token = this.jwtManageService.sign({
      userId,
      entryTime,
    });

    // entryTime을 unix timestamp 로 변환
    const unixTime = new Date(entryTime).getTime();
    console.log(unixTime);
    await this.redisService.addQueue(
      getConcertWatingTokenKey(),
      userId,
      unixTime,
    );

    return {
      token,
    };
  }
}
