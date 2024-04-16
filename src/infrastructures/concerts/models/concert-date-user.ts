import { $Enums, ConcertDateUser } from '@prisma/client';

export class ConcertDateUserModel {
  id: number;
  concertDateId: number;
  userId: number;
  seat: number;
  payStatus: $Enums.payStatus;
}
