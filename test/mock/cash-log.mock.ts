import { PrismaService } from '@@prisma/prisma.service';
import { cashLogType } from '@prisma/client';

export class CashLogMock {
  constructor(private prismaService: PrismaService) {}

  async insertCashLog(userIds: number[]): Promise<void> {
    const cashLogs = userIds.map((userId) => {
      return {
        userId,
        amount: 10000,
        type: 'CHARGE' as cashLogType,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    await this.prismaService.cashLog.createMany({
      data: cashLogs,
    });
  }
}
