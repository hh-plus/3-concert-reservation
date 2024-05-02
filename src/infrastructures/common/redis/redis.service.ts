import { Injectable, Inject } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  constructor(@Inject('REDIS_CLIENT') private readonly redis: Redis) {}

  async get(key: string): Promise<number | null> {
    // index 조회
    const jsonData = await this.redis.zrank('wait-queue', key);

    return jsonData;
  }

  async getPosition(token: string): Promise<number> {
    const queue = await this.redis.zrange('wait-queue', 0, -1);

    return queue.length - queue.indexOf(token) - 1; // 위치 반환 (0-indexed라서 +1)
  }

  async joinQueue(token: string) {
    const timestamp = Date.now();

    await this.redis.zadd('wait-queue', timestamp, token);
  }

  //   async set(key: string, value: object): Promise<void> {
  //     const json = JSON.stringify(value);

  //     await this.redis.setex(key, 300, json);
  //   }

  async del(key: string): Promise<void> {
    await this.redis.del(key);
  }
}
