import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ScheduleModule } from '@nestjs/schedule';

import { ConcertModule } from './apis/concerts/concert.module';
import { UserModule } from './apis/users/user.module';

import { CashModule } from './apis/cash/cash.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { CronService } from 'cron/redis.del-data.service';

@Module({
  imports: [
    RedisModule,
    ConcertModule,
    UserModule,
    CashModule,
    ScheduleModule.forRoot(),

    ClientsModule.register([
      {
        name: 'CONCERT_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: 'localhost',
          port: 16379,
        },
      },
    ]),
  ],
  controllers: [],
  providers: [CronService],
})
export class AppModule {}
