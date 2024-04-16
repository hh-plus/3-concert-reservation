import { Module } from '@nestjs/common';

import { ConcertModule } from './controllers/concert/concert.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConcertModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
