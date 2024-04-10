import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CashRepositoryPort } from './port/cash.port';
import { User } from '@prisma/client';

@Injectable()
export class ChargeCashService {
  constructor(private readonly cashRepository: CashRepositoryPort) {}

  validate(cash: number, user: User | null): void {
    if (!user) {
      throw new NotFoundException('user not found');
    }

    if (cash < 0 || !Number(cash)) {
      throw new BadRequestException('cash must be positive');
    }
  }

  async chargeCash(userId: number, cash: number): Promise<void> {}
}
