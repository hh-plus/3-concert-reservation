import { Injectable } from '@nestjs/common';
import { CashRepositoryPort } from 'src/applications/cash/adapters/cash.repository.port';
import { CashReaderRepository } from './cash.reader.repository';
import { CashMapper } from '../mapper/cash.mapper';
import { CashRepository } from './cash.repository';

@Injectable()
export class CashFactory implements CashRepositoryPort {
  constructor(
    private readonly cashReaderRepository: CashReaderRepository,
    private readonly cashRepository: CashRepository,
  ) {}

  async getCashListByUserId(userId: number) {
    const cashList = await this.cashReaderRepository.getCashLogsByUserId(
      userId,
    );

    return CashMapper.mappingCashLog(cashList);
  }

  async charge(userId: number, cash: number): Promise<void> {
    await this.cashRepository.createCashLog(userId, cash, 'CHARGE');
  }
}
