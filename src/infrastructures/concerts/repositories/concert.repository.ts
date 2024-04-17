import { PrismaService } from '@@prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class ConcertRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createConcertDateUser(
    transaction: Prisma.TransactionClient,
    concertDateId: number,
    userId: number,
    seat: number,
    expiredAt: Date,
  ) {
    return await (transaction ?? this.prismaService).concertDateUser.create({
      data: {
        expiredAt,
        concertDateId,
        userId,
        seat,
      },
    });
  }

  async deleteConcertDateUserById(
    transaction: Prisma.TransactionClient,
    concertDateUserId: number,
  ) {
    await (transaction ?? this.prismaService).concertDateUser.delete({
      where: {
        id: concertDateUserId,
      },
    });
  }
}
