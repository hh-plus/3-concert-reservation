import { Module, Global } from '@nestjs/common';
import Redis from 'ioredis';
import { RedisService } from './redis.service';
import { RedisLock } from './redis.lock';

@Global()
@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: () => {
        return new Redis({
          host: process.env.REDIS_HOST, // Redis 서버 주소
          port: Number(process.env.REDIS_PORT), // Redis 포트 번호

          db: 0, // DB 인덱스
        });
      },
    },
    RedisService,
    RedisLock,
  ],
  exports: ['REDIS_CLIENT', RedisService, RedisLock],
})
export class RedisModule {}
