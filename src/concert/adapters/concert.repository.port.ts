export interface ConcertRepositoryPort {
  getAvailableDate(concertId: number): Promise<{ date: Date }[]>;
}
