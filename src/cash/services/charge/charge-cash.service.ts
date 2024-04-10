import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CashLogRepositoryPort, UserRepositoryPort } from '../port/cash.port';
import { User } from '@prisma/client';

@Injectable()
export class ChargeCashService {
  constructor(
    private readonly cashLogRepository: CashLogRepositoryPort,
    private readonly userRepository: UserRepositoryPort,
  ) {}

  validate(cash: number, user: User | null): void {
    if (!user) {
      throw new NotFoundException('user not found');
    }

    if (cash < 0 || !Number(cash)) {
      throw new BadRequestException('cash must be positive');
    }
  }

  async chargeCash(userId: number, cash: number): Promise<{ cash: number }> {
    const user = await this.userRepository.getOne(userId);

    this.validate(cash, user);

    user.cash += cash;

    await this.cashLogRepository.create(user.id, user.cash, 'CHARGE');

    return { cash: user.cash };
  }
}
