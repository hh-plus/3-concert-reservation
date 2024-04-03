import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CashService } from './cash.service';
import { GetCashResDto } from './dto/getCash.dto';
import { ChargeCashReqBodyDto } from './dto/charge-cash.dto';

@Controller('cash')
export class CashController {
  constructor(private readonly cashService: CashService) {}

  /**
   * 유저가 가진 캐시 조회하기
   *
   * @tag Cash
   * @description 대기열 토큰이 필요하지 않음.
   * @param userId
   * @throws 404 유저를 찾을 수 없음
   */
  @Get('/:userId')
  async getCash(@Param('userId') userId: number): Promise<GetCashResDto> {
    return {
      cash: 10000,
    };
  }

  /**
   * 캐시 충전하기
   *
   * @tag Cash
   * @description 대기열 토큰이 필요하지 않음.
   * @param userId
   * @param body 캐시, 1000단위여야 하고 1000원 이상
   * @throws 400 잘못 된 요청
   * @throws 404 유저를 찾을 수 없음
   */
  @Post('/:userId/charge')
  async chargeCash(
    @Param('userId') userId: number,
    @Body() body: ChargeCashReqBodyDto,
  ): Promise<GetCashResDto> {
    return {
      cash: 10000,
    };
  }
}
