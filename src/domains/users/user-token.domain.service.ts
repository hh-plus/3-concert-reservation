import { Injectable } from '@nestjs/common';
import { UserTokenModel } from './models/user-token.model';

@Injectable()
export class UserTokenDomainService {
  getWaitingCount(userTokens: UserTokenModel[]): number {
    return userTokens.filter((ut) => {
      return ut.entryTime > new Date();
    }).length;
  }
}
