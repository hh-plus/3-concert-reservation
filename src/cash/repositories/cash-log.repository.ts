import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class CashLogRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getCash(userId: number): Promise<number> {
    return 10000;
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
