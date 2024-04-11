import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ConcertRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getAvailableDate(concertId: number): Promise<string[]> {
    return ['2021-01-01', '2021-01-02'];
  }
}
