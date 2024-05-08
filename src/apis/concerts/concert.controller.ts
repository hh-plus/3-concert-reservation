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
  Request,
  UseGuards,
} from '@nestjs/common';

import {
  ReserveConcertReqDto,
  ReserveConcertResDto,
} from './dto/reserve-concert.dto';

import { GetAvailableDateResDto } from './dto/get-available-date.dto';

import { GetAvailableSeatsResDto } from './dto/get-available-seats.dto';

import { ConcertServicePort } from './concert.service.port';
import { PassTokenGuard } from 'src/common/guard/pass-token/pass-token.guard';

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
    return {
      data: {
        concertDates: await this.concertService.getAvailableDate(concertId),
      },
    };
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
   * @param concertDateId
   * @throws 400 잘못 된 요청
   * @throws 401 접근 권한 없음
   * @returns
   */
  @UseGuards(PassTokenGuard)
  @Post('/:concertDateId/reserve')
  async reserveConcert(
    @Param('concertDateId', ParseIntPipe) concertDateId: number,
    @Body() body: ReserveConcertReqDto,
    @Request() req: any,
  ): Promise<ReserveConcertResDto> {
    return await this.concertService.reserveConcert(
      concertDateId,
      body,
      req.user.userId,
    );
  }

  /**
   * 콘서트 결제하기
   *
   * @param concertDateUserId
   * @param body 결제 정보
   * @throws 400 잘못 된 요청
   * @throws 401 접근 권한 없음
   */
  @UseGuards(PassTokenGuard)
  @Patch('/:concertId/:concertDateUserId/pay')
  async payConcert(
    @Param('concertId', ParseIntPipe) concertId: number,
    @Param('concertDateUserId', ParseIntPipe) concertDateUserId: number,
    @Request() req: any,
  ): Promise<void> {
    const userId = req.user?.userId ?? 1;
    await this.concertService.payConcert(concertId, concertDateUserId, userId);
  }
}
