import { Inject, Injectable } from '@nestjs/common';
import { CashServicePort } from 'src/apis/cash/cash.service.port';
import { CashRepositoryPort } from './adapters/cash.repository.port';
import { CashDomainClass } from 'src/domains/cash/cash.domain.service';

@Injectable()
export class CashService implements CashServicePort {
  constructor(
    @Inject('cashRepositoryPort')
    private readonly cashRepositoryPort: CashRepositoryPort,
  ) {}

  async charge(userId: number, cash: number): Promise<void> {
    await this.cashRepositoryPort.charge(userId, cash);
  }

  async getCash(userId: number): Promise<{ cash: number }> {
    const cashLogs = await this.cashRepositoryPort.getCashListByUserId(userId);
    const cash = CashDomainClass.getCashByCashLog(cashLogs);
    return { cash };
  }
}
