import { Module } from '@nestjs/common';
import { ChargeCashService } from './services/charge/charge-cash.service';
import { CashController } from './cash.controller';
import { CashLogRepository } from './repositories/cash-log.repository';
import { PrismaService } from 'prisma/prisma.service';
import {
  CashLogRepositoryPort,
  UserRepositoryPort,
} from './services/port/cash.port';
import { UserRepository } from 'src/user/repositories/user.repository';
import { GetOneCashService } from './services/get-one/get-one.service';

@Module({
  controllers: [CashController],
  providers: [
    PrismaService,
    ChargeCashService,
    GetOneCashService,
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
