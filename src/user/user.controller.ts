import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { GetTokenResDto } from './dto/getToken.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:userId/token')
  async getToken(@Param('userId') userId: number): Promise<GetTokenResDto> {
    return {
      token: 'token',
    };
  }
}
