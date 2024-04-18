import { PrismaService } from '@@prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { cashLogType } from '@prisma/client';

@Injectable()
export class CashRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createCashLog(userId: number, cash: number, type: cashLogType) {
    return await this.prismaService.cashLog.create({
      data: {
        userId,
        amount: cash,
        type,
      },
    });
  }
}
