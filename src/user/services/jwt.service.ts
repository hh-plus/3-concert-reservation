import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

interface payload {
  userId: number;

  waitingNumber: number;
}

@Injectable()
export class JwtManageService {
  constructor(private readonly jwtService: JwtService) {}

  sign(payload: payload) {
    return this.jwtService.sign(payload);
  }

  verify(token: string) {}
}
