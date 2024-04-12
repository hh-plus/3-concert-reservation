import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import {
  ReserveConcertReqDto,
  ReserveConcertResDto,
} from './dto/reserve-concert.dto';

import { GetAvailableDateResDto } from './dto/get-available-date.dto';

import { GetAvailableSeatsResDto } from './dto/get-available-seats.dto';
import { PayConcertReqBodyDto } from './dto/pay-concert.dto';

import { ConcertServicePort } from './adapters/concert.service.port';
import { PassTokenGuard } from 'src/guard/pass-token/pass-token.guard';

@Controller('concert')
export class ConcertController {
  constructor(
    @Inject('concertServicePort')
    private readonly concertService: ConcertServicePort,
  ) {}

  /**
   *
   * @description 콘서트 예약 가능한 날짜 조회
   * @param concertId
   * @throws 400 잘못 된 요청
   * @throws 401 접근 권한 없음

   */
  @UseGuards(PassTokenGuard)
  @Get('/:concertId/available-date')
  async getAvailableDate(
    @Param('concertId', ParseIntPipe) concertId: number,
  ): Promise<GetAvailableDateResDto> {
    return { data: await this.concertService.getAvailableDate(concertId) };
  }

  /**
   *
   * @description 콘서트 예약 가능한 좌석 조회
   * @param concertId
   * @throws 400 잘못 된 요청
   * @throws 401 접근 권한 없음
   * @returns
   */
  @Get('/:concertId/available-seats/:concertDateId')
  async getAvailableSeats(
    @Param('concertId', ParseIntPipe) concertId: number,
    @Param('concertDateId', ParseIntPipe) concertDateId: number,
  ): Promise<GetAvailableSeatsResDto> {
    return {
      data: await this.concertService.getAvailableSeats(
        concertId,
        concertDateId,
      ),
    };
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
