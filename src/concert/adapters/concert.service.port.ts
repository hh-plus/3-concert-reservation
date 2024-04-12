import { Injectable } from '@nestjs/common';

export interface ConcertServicePort {
  getAvailableDate(concertId: number): Promise<{ date: Date }[]>;
  getAvailableSeats(
    concertId: number,
    concertDateId: number,
  ): Promise<{ seats: number[] }>;
}
