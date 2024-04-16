import { Module } from '@nestjs/common';
import { CashController } from './cash.controller';
import { PrismaService } from '@@prisma/prisma.service';
import { CashService } from 'src/applications/cash/cash.service';
import { CashFactory } from 'src/infrastructures/cash/repositories/cash.factory';
import { CashReaderRepository } from 'src/infrastructures/cash/repositories/cash.reader.repository';
import { CashRepository } from 'src/infrastructures/cash/repositories/cash.repository';

@Module({
  imports: [],
  controllers: [CashController],
  providers: [
    PrismaService,
    {
      provide: 'cashServicePort',
      useClass: CashService,
    },
    {
      provide: 'cashRepositoryPort',
      useClass: CashFactory,
    },
    CashReaderRepository,
    CashRepository,
  ],
})
export class CashModule {}
