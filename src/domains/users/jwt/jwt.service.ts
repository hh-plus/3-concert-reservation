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

  constructor(private readonly jwtService: JwtService) {}

  sign(payload: payload) {
    // expires in 5m
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });
  }

  getEntryTime(waitingCount: number) {
    const now = new Date();
    now.setDate(
      now.getDate() + Math.floor(waitingCount / this.permitEntryNumber),
    );
    return now;
  }

  getExpiredAt(entryTime: Date) {
    const expiredAt = new Date(entryTime);
    expiredAt.setMinutes(expiredAt.getMinutes() + 5);
    return expiredAt;
  }

  verify(token: string) {}
}
