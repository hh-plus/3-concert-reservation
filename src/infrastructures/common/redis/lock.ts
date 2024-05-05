import { Inject } from '@nestjs/common';
import { Redis } from 'ioredis';

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

  async lockUser(userId: number) {
    const result = await this.redis.setnx(`user-lock:${userId}`, 'lock');
    if (result === 0) {
      throw new Error('User is already locked');
    }
  }

  async unlockUser(userId: number) {
    this.redis.del(`user-lock:${userId}`);
  }

  async unlockConcert(concertId: number) {
    this.redis.del(`concert-lock:${concertId}`);
  }
}
