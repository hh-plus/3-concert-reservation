import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { getConcertWatingTokenKey } from 'src/common/libs/get-wating-token-key';
import { RedisService } from 'src/infrastructures/common/redis/redis.service';

@Injectable()
export class CronService {
  constructor(private readonly redisService: RedisService) {}

  @Interval(1000)
  async handleInterval() {
    // 여기에 Redis에서 대기열을 확인하고 처리하는 로직을 추가할 수 있습니다.
    const memberCount = await this.redisService.getCount(
      getConcertWatingTokenKey(),
    );
    if (memberCount === 0) {
      // console.log('No members in queue, skipping...');
    } else {
      await this.redisService.removeBeforeDate(getConcertWatingTokenKey());
    }
  }
}
