import { Module } from '@nestjs/common';

import { ConcertController } from './concert.controller';

import { ConcertRepositoryPort } from '../../applications/concerts/adapters/concert.repository.port';
import { ConcertReaderRepository } from '../../infrastructures/concerts/repositories/concert.reader.repository';
import { PrismaService } from 'prisma/prisma.service';

import { ConcertService } from '../../applications/concerts/concert.service';
import { ConcertFactory } from 'src/infrastructures/concerts/repositories/concert.factory';
import { ConcertDomainService } from 'src/domains/concert/concert.domain.service';

@Module({
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
    ConcertReaderRepository,
  ],
})
export class ConcertModule {}
