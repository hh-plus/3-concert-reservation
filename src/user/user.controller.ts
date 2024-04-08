import { Controller, Get, Param } from '@nestjs/common';
import { UserTokenService } from './services/get-user-token.service';
import { GetTokenResDto } from './dto/getToken.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserTokenService) {}

  @Get('/:userId/token')
  async getToken(@Param('userId') userId: number): Promise<GetTokenResDto> {
    return {
      token: 'token',
    };
  }
}
