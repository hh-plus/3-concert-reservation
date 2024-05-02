import { Injectable, NestMiddleware } from '@nestjs/common';
import { RedisService } from 'src/infrastructures/common/redis/redis.service';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ValidateWaitTokenMiddleware implements NestMiddleware {
  constructor(private readonly redisService: RedisService) {}

  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    const token = req.headers['authorization']?.split('Bearer ')[1];
    const userId = req.params.userId;

    if (!token) {
      next();
      return;
    }

    const key = await this.redisService.get(token);
    console.log(key);
    if (key !== null) {
      const value = await this.redisService.getPosition(userId);
      req.headers['position'] = value.toString();
    }

    res.status(200).json({
      message: 'success',
    });
  }
}
