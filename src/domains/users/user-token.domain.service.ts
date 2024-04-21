import { Injectable } from '@nestjs/common';
import { UserTokenModel } from './models/user-token.model';

@Injectable()
export class UserTokenDomainService {
  getCurrentJoinCount(userTokens: UserTokenModel[]): number {
    return userTokens.filter((ut) => {
      return ut.entryTime < new Date() && ut.expiredAt > new Date();
    }).length;
  }

  getWaitingCount(userTokens: UserTokenModel[]): number {
    return userTokens.filter((ut) => {
      return ut.entryTime > new Date() && ut.expiredAt > new Date();
    }).length;
  }
}
