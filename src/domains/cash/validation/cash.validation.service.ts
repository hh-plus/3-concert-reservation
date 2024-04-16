import { InvalidCashException } from '../exceptions/invalid-cash.exception';

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
}
