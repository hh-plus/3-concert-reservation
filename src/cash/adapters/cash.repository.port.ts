export interface CashRepositoryPort {
  getOne(userId: number): Promise<number>;
}
