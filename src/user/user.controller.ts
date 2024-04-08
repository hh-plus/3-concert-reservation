import { Controller, Get, Param } from '@nestjs/common';
import { GetUserTokenService } from './services/get-user-token.service';
import { GetTokenResDto } from './dto/getToken.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: GetUserTokenService) {}

  @Get('/:userId/token')
  async getToken(@Param('userId') userId: number): Promise<GetTokenResDto> {
    return {
      token: 'token',
    };
  }
}
