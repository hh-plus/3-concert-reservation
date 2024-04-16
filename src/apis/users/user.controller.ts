import { Controller, Get, Inject, Param, Req } from '@nestjs/common';
import { UserService } from '../../applications/users/services/user.service';
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
    @Req() req,
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
