import { Module } from '@nestjs/common';

import { ConcertController } from './concert.controller';
import { GetAvailableDateService } from './services/get-available-date/get-available-date.service';
import { ConcertRepositoryPort } from './services/port/concert.repository.port';
import { ConcertRepository } from './repositories/concert.repository';

@Module({
  controllers: [ConcertController],
  providers: [
    GetAvailableDateService,
    {
      provide: ConcertRepositoryPort,
      useClass: ConcertRepository,
    },
    ConcertRepository,
  ],
})
export class ConcertModule {}
