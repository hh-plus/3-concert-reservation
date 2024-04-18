import { Injectable } from '@nestjs/common';
import { PrismaService } from '@@prisma/prisma.service';

@Injectable()
export class UserTokenReaderRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getOneByUserId(userId: number) {
    return await this.prismaService.userToken.findFirst({
      where: {
        userId,
      },
    });
  }

  async getAll() {
    return await this.prismaService.userToken.findMany();
  }

  async create(userId: number, entryTime: Date, expiredAt: Date) {
    return await this.prismaService.userToken.create({
      data: {
        userId,
        entryTime,
        expiredAt,
      },
    });
  }

  async getUserToken(userId: number) {
    const token = await this.prismaService.userToken.findFirst({
      where: {
        userId,
      },
    });
    return token;
  }
}
