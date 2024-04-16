import { Module } from '@nestjs/common';

import { ConcertModule } from './apis/concert/concert.module';
import { UserModule } from './user/user.module';

import { CashModule } from './apis/cash/cash.module';

@Module({
  imports: [ConcertModule, UserModule, CashModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
