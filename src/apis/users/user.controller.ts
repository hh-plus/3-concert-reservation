import { Controller, Get, Param, Req } from '@nestjs/common';
import { UserTokenService } from '../../applications/users/services/get-user-token.service';
import { GetTokenResDto } from './dtos/getToken.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserTokenService) {}

  @Get('/:userId/token')
  async getToken(
    @Param('userId') userId: number,
    @Req() req,
  ): Promise<GetTokenResDto> {
    const token = req.headers['authorization']?.split('Bearer ')[1];
    return await this.userService.getOrCreate(userId, token);
  }
}
