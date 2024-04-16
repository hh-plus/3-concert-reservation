import { Module } from '@nestjs/common';
import { CashController } from './cash.controller';

@Module({
  imports: [],
  controllers: [CashController],
})
export class CashModule {}
