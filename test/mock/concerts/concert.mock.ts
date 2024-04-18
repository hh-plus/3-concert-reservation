import { PrismaService } from '@@prisma/prisma.service';
import { Concert } from '@prisma/client';

export class ConcertMock {
  concerts: Concert[] = [];

  constructor(
    private readonly prismaService: PrismaService,
    count: number,
    maxSeats: number,
  ) {
    this.concerts = [];
    for (let i = 1; i <= count; i++) {
      this.concerts.push({
        id: i,
        name: `concert${i}`,
        price: 10000,
        maxSeats,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  }

  public async insert() {
    await this.prismaService.concert.createMany({
      data: this.concerts,
    });

    console.log('insert concert : ' + this.concerts.length);

    return this.concerts;
  }
}
