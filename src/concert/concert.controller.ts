import { Body, Controller, Param, Post } from '@nestjs/common';
import { ConcertService } from './concert.service';

import {
  ReserveConcertReqDto,
  ReserveConcertResDto,
} from './dto/reserveConcert.dto';

@Controller('concert')
export class ConcertController {
  constructor(private readonly concertService: ConcertService) {}

  /**
   *
   * @description 콘서트 예약
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
}
