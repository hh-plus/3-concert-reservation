import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConcertModule } from './concert/concert.module';
import { UserModule } from './user/user.module';
import { CashModule } from './cash/cash.module';

@Module({
  imports: [ConcertModule, UserModule, CashModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
