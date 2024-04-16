import { Inject, Injectable } from '@nestjs/common';
import { CashServicePort } from 'src/apis/cash/cash.service.port';
import { CashRepositoryPort } from './adapters/cash.repository.port';

@Injectable()
export class CashService implements CashServicePort {
  constructor(
    @Inject('cashRepositoryPort')
    private readonly cashRepositoryPort: CashRepositoryPort,
  ) {}

  async charge(userId: number, cash: number): Promise<{ cash: number }> {
    return { cash: 0 };
  }

  async getOne(userId: number): Promise<{ cash: number }> {
    return { cash: 0 };
  }
}
