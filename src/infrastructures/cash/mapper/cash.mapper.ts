import { CashLogModel } from '../models/cash-log.model';

export class CashMapper {
  static mappingCashLog(cashLog: CashLogModel[]) {
    return cashLog.map((log) => ({
      id: log.id,
      userId: log.userId,
      amount: log.amount,
      type: log.type,
    }));
  }
}
