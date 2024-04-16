import { cashLogType } from '@prisma/client';

export class CashLogModel {
  id: number;
  userId: number;
  amount: number;
  type: cashLogType;
}
