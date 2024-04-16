import { Inject, Injectable } from '@nestjs/common';
import { CashServicePort } from '../adapters/cash.service.port';
import { CashRepositoryPort } from '../adapters/cash.repository.port';

@Injectable()
export class CashService implements CashServicePort {
  constructor(
    @Inject('cashUseCase') private readonly cashUseCase: CashRepositoryPort,
  ) {}

  async getOne(userId: number): Promise<{ cash: number }> {
    const cash = await this.cashUseCase.getOne;

    return { cash: user.cash };
  }
}
