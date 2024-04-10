import { Injectable, NotFoundException } from '@nestjs/common';
import { CashLogRepositoryPort, UserRepositoryPort } from '../port/cash.port';
import { User } from '@prisma/client';

@Injectable()
export class GetOneCashService {
  constructor(
    private readonly cashLogRepository: CashLogRepositoryPort,
    private readonly userRepository: UserRepositoryPort,
  ) {}

  validate(user: User | null): void {
    if (!user) {
      throw new NotFoundException('user not found');
    }
  }

  async getOne(userId: number): Promise<{ cash: number }> {
    const user = await this.userRepository.getOne(userId);
    this.validate(user);

    return { cash: user.cash };
  }
}
