export interface CashServicePort {
  charge(userId: number, cash: number): Promise<{ cash: number }>;
  getOne(userId: number): Promise<{ cash: number }>;
}
