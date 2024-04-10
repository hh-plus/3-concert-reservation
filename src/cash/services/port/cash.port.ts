export abstract class CashRepositoryPort {
  abstract getCash(userId: number): Promise<number>;
  abstract chargeCash(userId: number, cash: number): Promise<void>;
}
