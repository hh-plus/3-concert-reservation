import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { ConcertModule } from './apis/concerts/concert.module';
import { UserModule } from './apis/users/user.module';

import { CashModule } from './apis/cash/cash.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';

@Module({
  imports: [
    RedisModule,
    ConcertModule,
    UserModule,
    CashModule,
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
  providers: [],
})
export class AppModule {}
