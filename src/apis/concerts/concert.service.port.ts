import { Injectable } from '@nestjs/common';
import {
  ReserveConcertReqDto,
  ReserveConcertResDto,
} from './dto/reserve-concert.dto';
import { PayConcertResDto } from './dto/pay-concert.dto';

export interface ConcertServicePort {
  getAvailableDate(concertId: number): Promise<{ id: number; date: string }[]>;
  getAvailableSeats(
    concertId: number,
    concertDateId: number,
  ): Promise<{ seats: number[] }>;
  reserveConcert(
    concertDateId: number,
    body: ReserveConcertReqDto,
    userId: number,
  ): Promise<ReserveConcertResDto>;

  payConcert(
    concertId: number,
    concertDateUserId: number,
    userId: number,
  ): Promise<void>;
}
