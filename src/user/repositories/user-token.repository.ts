import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UserTokenRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getUserToken(userId: number) {
    const token = await this.prismaService.userToken.findFirst({
      where: {
        userId,
      },
    });
    return token;
  }
}
