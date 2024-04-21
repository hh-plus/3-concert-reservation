import { PrismaService } from '@@prisma/prisma.service';
import { User } from '@prisma/client';

export class UserMock {
  users: User[] = [];
  constructor(private readonly prismaService: PrismaService, count: number) {
    for (let i = 1; i <= count; i++) {
      this.users.push({
        id: i,
        name: `name${i}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  }

  public async insert(): Promise<User[]> {
    await this.prismaService.user.createMany({
      data: this.users,
    });
    console.log('insert user : ' + this.users.length);
    return this.users;
  }
}
