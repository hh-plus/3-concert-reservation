import { Controller, Get, Inject, Param, Req, Request } from '@nestjs/common';

import { GetTokenResDto } from './dtos/getToken.dto';
import { UserServicePort } from './user.service.port';

@Controller('user')
export class UserController {
  constructor(
    @Inject('userServicePort') private readonly userService: UserServicePort,
  ) {}

  @Get('/:userId/token')
  async getToken(
    @Param('userId') userId: number,
    @Request() req,
  ): Promise<GetTokenResDto> {
    const token = req.headers['authorization']?.split('Bearer ')[1];
    const result = await this.userService.checkTokenOrCreate(userId, token);
    return {
      data: {
        waitingNumber: result.waitingNumber,
      },
    };
  }
}
