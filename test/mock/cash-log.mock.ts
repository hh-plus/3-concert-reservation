import { PrismaService } from '@@prisma/prisma.service';
import { cashLogType } from '@prisma/client';

export class CashLogMock {
  constructor() {}

  static async insertCashLog(
    prisma: PrismaService,
    userIds: number[],
  ): Promise<void> {
    const cashLogs = userIds.map((userId) => {
      return {
        userId,
        amount: 10000,
        type: 'CHARGE' as cashLogType,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    await prisma.cashLog.createMany({
      data: cashLogs,
    });
  }
}
