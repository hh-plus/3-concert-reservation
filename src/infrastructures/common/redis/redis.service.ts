import { Injectable, Inject } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  constructor(@Inject('REDIS_CLIENT') private readonly redis: Redis) {}

  async getCount(key: string) {
    return await this.redis.zcard(key);
  }

  async getWatingDate(key: string) {
    const count = await this.getCount(key);
    // 100명당 30초씩 현재시간에서 더해준다.
    return Date.now() + Math.floor(count / 100) * 30 * 1000;
  }

  async getRanking(
    key: string,
    member: number | string,
  ): Promise<number | null> {
    return await this.redis.zrank(key, member);
  }

  async addQueue(key: string, member: number | string, score = Date.now()) {
    await this.redis.zadd(key, score, member);
  }

  async removeBeforeDate(key: string) {
    await this.redis.zremrangebyscore(key, 0, Date.now());
  }

  async removeWatingQueue(key: string, userId: number) {
    await this.redis.zrem(key, userId);
  }

  async getRankOrAddQueue(key: string, userId: number) {
    const rank = await this.getRanking(key, userId);
    if (!rank) {
      await this.addQueue(key, userId, await this.getWatingDate(key));
    }
    return rank;
  }
}
