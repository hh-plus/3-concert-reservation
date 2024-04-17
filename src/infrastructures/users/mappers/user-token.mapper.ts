import { UserToken } from '@prisma/client';
import { UserTokenModel } from 'src/domains/users/models/user-token.model';

export const mappingUserToken = (userToken: UserToken[]): UserTokenModel[] => {
  return userToken.map((token) => {
    return {
      id: token.id,
      userId: token.userId,
      entryTime: token.entryTime,
      expiredAt: token.expiredAt,
    };
  });
};

export const convertingUserToken = (
  userToken: UserTokenModel,
): UserTokenModel => {
  return {
    id: userToken.id,
    userId: userToken.userId,
    entryTime: userToken.entryTime,
    expiredAt: userToken.expiredAt,
  };
};
