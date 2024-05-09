import { Injectable, NestMiddleware } from '@nestjs/common';
import { RedisService } from 'src/infrastructures/common/redis/redis.service';
import { Request, Response, NextFunction } from 'express';
import {
  getConcertActiveTokenKey,
  getConcertWatingTokenKey,
} from 'src/common/libs/get-wating-token-key';
import { JwtManageService } from 'src/domains/users/jwt/jwt.service';

@Injectable()
export class ValidateWaitTokenMiddleware implements NestMiddleware {
  constructor(
    private readonly redisService: RedisService,
    private readonly jwtService: JwtManageService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    const token = req.headers['authorization']?.split('Bearer ')[1];
    const userId = req.params.userId;

    if (!token) {
      next();
      return;
    }

    const key = getConcertWatingTokenKey();
    console.log(userId);
    let ranking = await this.redisService.getRanking(key, Number(userId));
    console.log(ranking);
    // 토큰이 있는데 랭킹이 없다면 웨이팅이 끝난 것임.
    // 즉, 해당 토큰을 입장시키고, redis에 active 토큰을 추가해준다.
    // score에는 현재 시간을 넣어주고
    // 5분짜리 jwt토큰을 만들어서 반환해준다.
    if (ranking == null) {
      const activeKey = getConcertActiveTokenKey();
      const activeToken = this.jwtService.sign({
        userId: Number(userId),
        entryTime: new Date(),
      });
      await this.redisService.addQueue(activeKey, token, new Date().getTime());
      res.status(200).json({
        message: 'success',
        waitCount: 0,
        token: activeToken,
      });
      return;
    }

    res.status(200).json({
      message: 'success',
      waitCount: ranking,
      token: '',
    });
  }
}
