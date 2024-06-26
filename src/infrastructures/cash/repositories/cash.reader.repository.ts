import { PrismaService } from '@@prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CashReaderRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getCashLogsByUserId(userId: number) {
    return await this.prismaService.cashLog.findMany({
      where: {
        userId,
      },
    });
  }
}
