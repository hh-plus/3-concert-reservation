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
}
