import { ConflictException } from '@nestjs/common';
import { UserTokenModel } from '../models/user-token.model';

export const checkExistUserToken = async (userToken: UserTokenModel | null) => {
  if (!userToken) {
    throw new ConflictException('User token not found');
  }
};
