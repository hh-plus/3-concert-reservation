import { PrismaService } from '@@prisma/prisma.service';

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
