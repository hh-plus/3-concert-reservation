export interface ReserveConcertReqDto {
  seat: number;
}

export interface ReserveConcertResDto {
  success: boolean;
  message: string;
}
