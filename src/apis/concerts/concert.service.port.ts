import { Injectable } from '@nestjs/common';
import { ReserveConcertReqDto } from './dto/reserve-concert.dto';

export interface ConcertServicePort {
  getAvailableDate(concertId: number): Promise<{ date: string[] }>;
  getAvailableSeats(
    concertId: number,
    concertDateId: number,
  ): Promise<{ seats: number[] }>;
  reserveConcert(
    concertDateId: number,
    body: ReserveConcertReqDto,
    userId: number,
  ): Promise<void>;
}
