import { Module } from '@nestjs/common';
import { ChargeCashService } from './services/cash.service';
import { CashController } from './cash.controller';
import { CashLogRepository } from './repositories/cash-log.repository';
import { PrismaService } from 'prisma/prisma.service';
import {
  CashLogRepositoryPort,
  UserRepositoryPort,
} from './services/port/cash.port';
import { UserRepository } from 'src/user/repositories/user.repository';

@Module({
  controllers: [CashController],
  providers: [
    PrismaService,
    ChargeCashService,
    {
      provide: CashLogRepositoryPort,
      useClass: CashLogRepository,
    },
    {
      provide: UserRepositoryPort,
      useClass: UserRepository,
    },
  ],
})
export class CashModule {}
