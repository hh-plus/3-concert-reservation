import {
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';

import { GetTokenResDto } from './dtos/getToken.dto';
import { UserServicePort } from './user.service.port';
import { ValidateWaitToken } from 'src/guard/redis/validate-token.guard';

@Controller('user')
export class UserController {
  constructor(
    @Inject('userServicePort') private readonly userService: UserServicePort,
  ) {}

  @Get('/:userId/token')
  @UseGuards(ValidateWaitToken)
  async getToken(
    @Param('userId', ParseIntPipe) userId: number,
    @Request() req,
  ): Promise<GetTokenResDto> {
    const token = req.headers['authorization']?.split('Bearer ')[1];
    return {
      data: {
        token: 'token',
      },
    };
    const result = await this.userService.getOrCreate(userId, token);
    return {
      data: {
        token: result.token || '',
      },
    };
  }
}
