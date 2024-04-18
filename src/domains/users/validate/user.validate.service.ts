import { ConflictException } from '@nestjs/common';
import { UserTokenModel } from '../models/user-token.model';

export class UserValidateService {
  public static validate(
    existUserToken: UserTokenModel | null,
    token: string | null,
  ) {
    if (!existUserToken && token)
      throw new ConflictException('유효하지 않은 Token 입니다.');

    if (existUserToken && !token) {
      throw new ConflictException('유효하지 않은 요청입니다.');
    }
  }
}
