import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '@@prisma/prisma.service';

@Injectable()
export class ConcertRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getConcertsIncludeConcertDate(concertId: number) {
    const concerts = await this.prismaService.concert.findUnique({
      where: {
        id: concertId,
      },
      include: {
        ConcertDate: {
          include: {
            ConcertDateUser: true,
          },
        },
      },
    });

    if (!concerts) {
      throw new NotFoundException('concert not found');
    }

    return concerts;
  }

  async getConcertById(concertId: number) {
    const concert = await this.prismaService.concert.findUnique({
      where: {
        id: concertId,
      },
    });

    if (!concert) {
      throw new NotFoundException('concert not found');
    }

    return concert;
  }

  async getConcertsDateByConcertId(concertId: number) {
    const concertDate = await this.prismaService.concertDate.findMany({
      where: {
        concertId,
      },
    });

    return concertDate;
  }

  async getSeatsByConcertDateId(concertDateId: number) {
    const concertSeats = await this.prismaService.concertDateUser.findMany({
      where: {
        concertDateId,
      },
    });

    return concertSeats;
  }
}
