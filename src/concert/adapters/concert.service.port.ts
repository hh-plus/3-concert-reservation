import { Injectable } from '@nestjs/common';

export interface ConcertServicePort {
  getAvailableDate(concertId: number): Promise<{ date: Date }[]>;
}
