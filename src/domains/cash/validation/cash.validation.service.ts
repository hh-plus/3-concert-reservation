import { CashLog } from '@prisma/client';
import { InvalidCashException } from '../exceptions/invalid-cash.exception';
import { CashLogModel } from 'src/infrastructures/cash/models/cash-log.model';

export class CashValidationService {
  static validateCash(cash: number) {
    if (cash < 0) {
      throw new InvalidCashException();
    }

    if (cash % 1000 !== 0) {
      throw new InvalidCashException();
    }

    if (cash > 1000000) {
      throw new InvalidCashException();
    }
  }

  static getCashByCashLog(cashLogs: CashLogModel[]): number {
    let cash = 0;
    cashLogs.forEach((cashLog) => {
      if (cashLog.type === 'CHARGE') {
        cash += cashLog.amount;
      }
      if (cashLog.type === 'USE') {
        cash -= cashLog.amount;
      }
    });
    return cash;
  }
}
