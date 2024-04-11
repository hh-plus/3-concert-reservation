import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

import {
  ReserveConcertReqDto,
  ReserveConcertResDto,
} from './dto/reserve-concert.dto';

import { GetAvailableDateResDto } from './dto/get-available-date.dto';

import { GetAvailableSeatsResDto } from './dto/get-available-seats.dto';
import { PayConcertReqBodyDto } from './dto/pay-concert.dto';
import { GetAvailableDateService } from './services/get-available-date/get-available-date.service';

@Controller('concert')
export class ConcertController {
  constructor(
    private readonly getAvailableDateService: GetAvailableDateService,
  ) {}

  /**
   *
   * @description 콘서트 예약 가능한 날짜 조회
   * @param concertId
   * @throws 400 잘못 된 요청
   * @throws 401 Bad Request

   */
  @Get('/:concertId/available-date')
  async getAvailableDate(
    @Param('concertId') concertId: number,
  ): Promise<GetAvailableDateResDto> {
    return { date: ['2021-01-01', '2021-01-02'] };
  }

  /**
   *
   * @description 콘서트 예약 가능한 좌석 조회
   * @param concertId
   * @throws 400 잘못 된 요청
   * @throws 401 Bad Request
   * @returns
   */
  @Get('/:concertId/available-seats')
  async getAvailableSeats(
    @Param('concertId') concertId: number,
  ): Promise<GetAvailableSeatsResDto> {
    return { seats: [1, 2, 3] };
  }

  /** 콘서트 좌석 예약하기
   *
   * @param concertId
   * @throws 400 잘못 된 요청
   * @throws 401 Bad Request
   * @returns
   */
  @Post('/:concertId/reserve')
  async reserveConcert(
    @Param('concertId') concertId: number,
    @Body() body: ReserveConcertReqDto,
  ): Promise<ReserveConcertResDto> {
    return {
      success: true,
      message: 'Success',
    };
  }

  /**
   * 콘서트 결제하기
   *
   * @param concertId
   * @param body 결제 정보
   * @throws 400 잘못 된 요청
   * @throws 401 Bad Request
   */
  @Patch('/:concertId/pay')
  async payConcert(
    @Param('concertId') concertId: number,
    @Body() body: PayConcertReqBodyDto,
  ): Promise<void> {
    return;
  }
}
