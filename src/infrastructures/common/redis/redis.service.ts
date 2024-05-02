import { Injectable, Inject } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  constructor(@Inject('REDIS_CLIENT') private readonly redis: Redis) {}

  getUserKey(userId: number): string {
    return `user:${userId}`;
  }

  //   async get(key: string): Promise<object | null> {
  //     const jsonData = await this.redis.get(key);
  //     return jsonData ? JSON.parse(jsonData) : null;
  //   }

  async getPosition(userId: number): Promise<number> {
    const queue = await this.redis.lrange('queue', 0, -1);
    console.log(queue);

    const key = this.getUserKey(userId);
    return queue.indexOf(key) + 1; // 위치 반환 (0-indexed라서 +1)
  }

  async joinQueue(userId: number) {
    const key = this.getUserKey(userId);
    await this.redis.lpush('queue', key);
    await this.redis.expire(key, 300);
  }

  //   async set(key: string, value: object): Promise<void> {
  //     const json = JSON.stringify(value);

  //     await this.redis.setex(key, 300, json);
  //   }

  async del(key: string): Promise<void> {
    await this.redis.del(key);
  }
}
