import { Injectable } from '@nestjs/common';

export interface ConcertServicePort {
  getAvailableDate(concertId: number): Promise<{ date: string[] }>;
  getAvailableSeats(
    concertId: number,
    concertDateId: number,
  ): Promise<{ seats: number[] }>;
}
