import { Module } from '@nestjs/common';
import { ChargeCashService } from './services/cash.service';
import { CashController } from './cash.controller';
import { CashRepository } from './repositories/cash.repository';
import { PrismaService } from 'prisma/prisma.service';
import { CashRepositoryPort } from './services/port/cash.port';

@Module({
  controllers: [CashController],
  providers: [
    PrismaService,
    ChargeCashService,
    {
      provide: CashRepositoryPort,
      useClass: CashRepository,
    },
  ],
})
export class CashModule {}
