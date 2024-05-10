import { CashLogModel } from 'src/infrastructures/cash/models/cash-log.model';

export interface CashRepositoryPort {
  getCashListByUserId(userId: number): Promise<CashLogModel[]>;
  charge(userId: number, cash: number): Promise<void>;
  use(userId: number, cash: number): Promise<void>;
}
