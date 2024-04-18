import { CashLogModel } from 'src/infrastructures/cash/models/cash-log.model';

export class CashDomainClass {
  static getCashByCashLog(cashLog: CashLogModel[]) {
    let cash = 0;
    cashLog.forEach((log) => {
      if (log.type === 'CHARGE') {
        cash += log.amount;
      } else if (log.type === 'USE') {
        cash -= log.amount;
      }
    });
    return cash;
  }
}
