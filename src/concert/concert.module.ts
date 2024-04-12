import { Module } from '@nestjs/common';

import { ConcertController } from './concert.controller';

import { ConcertRepositoryPort } from './adapters/concert.repository.port';
import { ConcertRepository } from './repositories/concert.repository';
import { PrismaService } from 'prisma/prisma.service';
import { ConcertUseCase } from './repositories/concert.use-case';
import { ConcertService } from './services/concert.service';

@Module({
  controllers: [ConcertController],
  providers: [
    PrismaService,
    ConcertService,
    ConcertUseCase,
    {
      provide: 'concertServicePort',
      useClass: ConcertService,
    },
    {
      provide: 'concertRepositoryPort',
      useClass: ConcertUseCase,
    },
    ConcertRepository,
  ],
})
export class ConcertModule {}
