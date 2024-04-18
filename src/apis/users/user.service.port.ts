export interface UserServicePort {
  getOrCreate(
    userId: number,
    token: string,
  ): Promise<{
    waitingNumber: number;
    token?: string;
  }>;
}
