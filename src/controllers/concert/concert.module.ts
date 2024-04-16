import { Module } from '@nestjs/common';

import { ConcertController } from './concert.controller';

import { ConcertRepositoryPort } from '../../applications/adapters/concert.repository.port';
import { ConcertReaderRepository } from '../../infrastructures/concert/repositories/concert.reader.repository';
import { PrismaService } from 'prisma/prisma.service';

import { ConcertService } from '../../applications/concert.service';
import { ConcertFactory } from 'src/infrastructures/concert/repositories/concert.factory';

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
    ConcertReaderRepository,
  ],
})
export class ConcertModule {}
