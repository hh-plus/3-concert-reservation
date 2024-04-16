import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '@@prisma/prisma.service';

@Injectable()
export class ConcertReaderRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getConcertById(concertId: number) {
    return await this.prismaService.concert.findUnique({
      where: {
        id: concertId,
      },
    });
  }

  async getConcertsDateByConcertId(concertId: number) {
    return await this.prismaService.concertDate.findMany({
      where: {
        concertId,
      },
    });
  }

  async getConcertDateById(concertDateId: number) {
    return await this.prismaService.concertDate.findUnique({
      where: {
        id: concertDateId,
      },
    });
  }

  async getSeatsByConcertDateIds(concertDateId: number | number[]) {
    return await this.prismaService.concertDateUser.findMany({
      where: {
        OR:
          concertDateId instanceof Array
            ? concertDateId.map((id) => ({ concertDateId: id }))
            : [{ concertDateId }],
      },
    });
  }
}
