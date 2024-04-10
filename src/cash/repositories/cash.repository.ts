import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class CashRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getCash(userId: number): Promise<number> {
    return 10000;
  }

  async chargeCash(userId: number, cash: number): Promise<void> {}
}
