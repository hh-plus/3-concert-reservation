import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

interface payload {
  userId: number;
  entryTime: Date;
  waitingNumber: number;
}

@Injectable()
export class JwtManageService {
  public permitEntryNumber = 100;
  public exipredTime = 2;

  constructor(private readonly jwtService: JwtService) {}

  sign(payload: payload) {
    // expires in 5m

    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });
  }

  getEntryTime(currentCount: number, waitingCount: number) {
    const now = new Date();
    if (currentCount < this.permitEntryNumber) {
      return now;
    }

    const additionalMinutes = Math.floor(
      (waitingCount / this.permitEntryNumber + this.exipredTime) * 1,
    );

    // 현재 분에 계산된 추가 분을 더합니다.
    now.setMinutes(now.getMinutes() + additionalMinutes);

    return now;
  }

  getExpiredAt(entryTime: Date) {
    const expiredAt = new Date(entryTime);
    expiredAt.setMinutes(expiredAt.getMinutes() + this.exipredTime);
    return expiredAt;
  }

  async verify(token: string) {
    const payload = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });
    return payload;
  }
}
