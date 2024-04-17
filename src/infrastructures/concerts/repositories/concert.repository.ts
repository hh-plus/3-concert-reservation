import { PrismaService } from '@@prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConcertRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createConcertDateUser(
    concertDateId: number,
    userId: number,
    seat: number,
    expiredAt: Date,
  ) {
    await this.prismaService.concertDateUser.create({
      data: {
        expiredAt,
        concertDateId,
        userId,
        seat,
      },
    });
  }
}
