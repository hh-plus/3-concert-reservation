export abstract class ConcertRepositoryPort {
  abstract getAvailableDate(concertId: number): Promise<{ date: Date }[]>;
}
