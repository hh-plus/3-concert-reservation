export interface ConcertRepositoryPort {
  getAvailableDate(concertId: number): Promise<{ date: Date }[]>;
  getAvailableSeats(
    concertId: number,
    concertDateId: number,
  ): Promise<{ seats: number[] }>;
}
