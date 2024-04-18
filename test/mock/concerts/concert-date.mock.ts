import { PrismaService } from '@@prisma/prisma.service';
import { ConcertDate } from '@prisma/client';

export class ConcertDateMock {
  concertDates: Omit<ConcertDate, 'id'>[] = [];

  constructor(
    private readonly prismaService: PrismaService,
    concertId: number,
    counts: number,
  ) {
    for (let i = 1; i <= counts; i++) {
      const now = new Date();
      now.setDate(now.getDate() + i);
      this.concertDates.push({
        concertId,
        date: now,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  }

  async insert() {
    return await this.prismaService.concertDate.createMany({
      data: this.concertDates,
    });
  }
}
