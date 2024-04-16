export interface CashServicePort {
  charge(userId: number, cash: number): Promise<void>;
  getCash(userId: number): Promise<{ cash: number }>;
}
