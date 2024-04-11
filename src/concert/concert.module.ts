import { Module } from '@nestjs/common';

import { ConcertController } from './concert.controller';
import { GetAvailableDateService } from './services/get-available-date/get-available-date.service';
import { ConcertRepositoryPort } from './services/port/concert.repository.port';
import { ConcertRepository } from './repositories/concert.repository';
import { PrismaService } from 'prisma/prisma.service';
import { ConcertUseCase } from './repositories/concert.use-case';

@Module({
  controllers: [ConcertController],
  providers: [
    PrismaService,
    GetAvailableDateService,
    {
      provide: ConcertRepositoryPort,
      useClass: ConcertUseCase,
    },
    ConcertRepository,
  ],
})
export class ConcertModule {}
