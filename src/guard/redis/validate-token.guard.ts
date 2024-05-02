import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RedisService } from 'src/infrastructures/common/redis/redis.service';

@Injectable()
export class ValidateWaitToken implements CanActivate {
  constructor(private readonly redisService: RedisService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const userId = request.params.userId;

    await this.redisService.joinQueue(userId);
    const value = await this.redisService.getPosition(userId);
    console.log(value);

    return true;
  }
}
