import { Inject, Injectable, Logger } from '@nestjs/common';

import { JwtManageService } from '../../../domains/users/jwt/jwt.service';

import { RedisService } from 'src/infrastructures/common/redis/redis.service';
import { getConcertWatingTokenKey } from 'src/common/libs/get-wating-token-key';

@Injectable()
export class UserService {
  constructor(
    private readonly jwtManageService: JwtManageService,

    private readonly redisService: RedisService,
  ) {}

  public async getOrCreate(userId: number): Promise<{ token: string }> {
    // const waitingNumber = this.redisService.getPosition()

    const waitingCount = await this.redisService.getCount(
      getConcertWatingTokenKey(),
    );

    const entryTime = this.jwtManageService.getEntryTime(waitingCount);

    const token = this.jwtManageService.sign({
      userId,
      entryTime,
    });

    // entryTime을 unix timestamp 로 변환
    const unixTime = new Date(entryTime).getTime();

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
