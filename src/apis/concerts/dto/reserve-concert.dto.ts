import { $Enums } from '@prisma/client';

export interface ReserveConcertReqDto {
  seat: number;
}

export interface ReserveConcertResDto {
  id: number;
  concertDateId: number;
  userId: number;
  seat: number;
  payStatus: $Enums.payStatus;
  expiredAt: Date;
}
