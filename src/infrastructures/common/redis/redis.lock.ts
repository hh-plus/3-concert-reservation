import { Inject, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisLock {
  constructor(@Inject('REDIS_CLIENT') private readonly redis: Redis) {}

  async lockConcert(concertId: number) {
    this.redis.setnx(`concert-lock:${concertId}`, 'lock', async (err, res) => {
      if (err) {
        throw err;
      }
      if (res === 0) {
        throw new Error('Concert is already locked');
      }
    });
  }

  async lockUser(userId: number): Promise<boolean> {
    return (await this.redis.setnx(`user-lock:${userId}`, 'lock')) === 1
      ? true
      : false;
  }

  async unlockUser(userId: number) {
    this.redis.del(`user-lock:${userId}`);
  }

  async unlockConcert(concertId: number) {
    this.redis.del(`concert-lock:${concertId}`);
  }
}
