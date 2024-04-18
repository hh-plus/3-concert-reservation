export interface GetAvailableDateResDto {
  data: {
    concertDates: {
      id: number;
      date: string;
    }[];
  };
}
