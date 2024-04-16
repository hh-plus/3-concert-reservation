import { Module } from '@nestjs/common';

import { ConcertController } from './controllers/concert.controller';

import { ConcertRepositoryPort } from './adapters/concert.repository.port';
import { ConcertRepository } from './infra/repositories/concert.repository';
import { PrismaService } from 'prisma/prisma.service';
import { ConcertFactory } from './infra/services/concert.factory';
import { ConcertService } from './services/concert.service';

@Module({
  controllers: [ConcertController],
  providers: [
    PrismaService,
    ConcertService,
    ConcertFactory,
    {
      provide: 'concertServicePort',
      useClass: ConcertService,
    },
    {
      provide: 'concertRepositoryPort',
      useClass: ConcertFactory,
    },
    ConcertRepository,
  ],
})
export class ConcertModule {}
