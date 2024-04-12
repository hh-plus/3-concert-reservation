import { ConflictException } from '@nestjs/common';
import { ConcertDateUser } from '@prisma/client';

export class ConcertValidate {
  static validateSeats(maxSeats: number, seats: ConcertDateUser[]) {
    if (seats.length >= maxSeats) {
      throw new ConflictException('seats are full');
    }
  }
}
