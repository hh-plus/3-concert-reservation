import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class CashLogRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getCash(userId: number): Promise<{ cash: number }> {
    const cash = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        cash: true,
      },
    });

    const result = { cash: cash ? cash.cash : 0 };

    return result;
  }

  async create(userId: number, cash: number): Promise<void> {
    await this.prismaService.cashLog.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        amount: cash,
        type: 'CHARGE',
      },
    });
  }
}
