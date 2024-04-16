export interface UserServicePort {
  checkTokenOrCreate(
    userId: number,
    token: string,
  ): Promise<{
    waitingNumber: number;
  }>;
}
