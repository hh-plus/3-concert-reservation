import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConcertRepositoryPort } from './adapters/concert.repository.port';
import { ConcertServicePort } from '../../apis/concerts/concert.service.port';
import { ConcertDomainService } from 'src/domains/concert/concert.domain.service';
import { NotFoundConcertException } from 'src/domains/concert/exceptions/not-found-concert.exception';
import { ReserveConcertReqDto } from 'src/apis/concerts/dto/reserve-concert.dto';

@Injectable()
export class ConcertService implements ConcertServicePort {
  constructor(
    @Inject('concertRepositoryPort')
    private readonly concertRepositoryPort: ConcertRepositoryPort,

    private readonly concertDomainService: ConcertDomainService,
  ) {}

  async getAvailableDate(concertId: number) {
    const concert = await this.concertRepositoryPort.getConcertById(concertId);
    if (!concert) {
      throw new NotFoundConcertException();
    }
    const concertDates =
      await this.concertRepositoryPort.getConcertDatesByConcertId(concertId);
    const concertDateUsers =
      await this.concertRepositoryPort.getConcertDateUsersByConcertDateId(
        concertDates.map((cd) => cd.id),
      );

    return {
      date: this.concertDomainService.getAvailableDate(
        concert,
        concertDates,
        concertDateUsers,
      ),
    };
  }

  async getAvailableSeats(concertId: number, concertDateId: number) {
    const concert = await this.concertRepositoryPort.getConcertById(concertId);
    if (!concert) {
      throw new NotFoundConcertException();
    }
    const concertDate = await this.concertRepositoryPort.getConcertDateById(
      concertId,
    );
    if (!concertDate) {
      throw new NotFoundException();
    }
    const concertDateUsers =
      await this.concertRepositoryPort.getConcertDateUsersByConcertDateId(
        concertDateId,
      );
    return {
      seats: this.concertDomainService.getAvailableSeats(
        concert.maxSeats,
        concertDateUsers,
      ),
    };
  }

  async reserveConcert(
    concertDateId: number,
    reserveConcertReqDto: ReserveConcertReqDto,
    userId: number,
  ) {}
}
