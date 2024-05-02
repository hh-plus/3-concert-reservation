import { Module } from '@nestjs/common';

import { ConcertController } from './concert.controller';

import { ConcertRepositoryPort } from '../../applications/concerts/adapters/concert.repository.port';
import { ConcertReaderRepository } from '../../infrastructures/concerts/repositories/concert.reader.repository';
import { PrismaService } from '@@prisma/prisma.service';

import { ConcertService } from '../../applications/concerts/concert.service';
import { ConcertFactory } from 'src/infrastructures/concerts/repositories/concert.factory';
import { ConcertDomainService } from 'src/domains/concerts/concert.domain.service';
import { ConcertRepository } from 'src/infrastructures/concerts/repositories/concert.repository';
import { CashFactory } from 'src/infrastructures/cash/repositories/cash.factory';
import { CashRepository } from 'src/infrastructures/cash/repositories/cash.repository';
import { CashReaderRepository } from 'src/infrastructures/cash/repositories/cash.reader.repository';
import { RedisModule } from 'src/infrastructures/common/redis/redis.module';
import { RedisManager } from '@liaoliaots/nestjs-redis';

@Module({
  imports: [RedisModule],
  controllers: [ConcertController],
  providers: [
    PrismaService,
    ConcertService,
    ConcertFactory,
    ConcertDomainService,
    {
      provide: 'concertServicePort',
      useClass: ConcertService,
    },
    {
      provide: 'concertRepositoryPort',
      useClass: ConcertFactory,
    },
    {
      provide: 'cashRepositoryPort',
      useClass: CashFactory,
    },
    ConcertReaderRepository,
    CashRepository,
    CashReaderRepository,
    ConcertRepository,
  ],
})
export class ConcertModule {}
