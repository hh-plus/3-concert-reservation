import { Module } from '@nestjs/common';

import { ConcertModule } from './apis/concerts/concert.module';
import { UserModule } from './apis/users/user.module';

import { CashModule } from './apis/cash/cash.module';

@Module({
  imports: [ConcertModule, UserModule, CashModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
