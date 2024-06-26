import { ConflictException } from '@nestjs/common';
import { UserTokenModel } from '../models/user-token.model';

export const checkExistUserToken = (userToken: UserTokenModel | null) => {
  if (userToken) {
    throw new ConflictException('User token already found');
  }
};
