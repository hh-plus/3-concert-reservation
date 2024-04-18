import { UserTokenRepositoryPort } from 'src/applications/users/services/port/user-token.repository.port';
import { UserTokenReaderRepository } from './user-token/user-token.reader.repository';
import {
  convertingUserToken,
  mappingUserToken,
} from '../mappers/user-token.mapper';
import { UserTokenModel } from 'src/domains/users/models/user-token.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserTokenFactory implements UserTokenRepositoryPort {
  constructor(
    private readonly userTokenReaderRepository: UserTokenReaderRepository,
  ) {}

  async getAll() {
    return mappingUserToken(await this.userTokenReaderRepository.getAll());
  }

  async getUserTokenByUserId(userId: number): Promise<UserTokenModel | null> {
    const userToken = await this.userTokenReaderRepository.getOneByUserId(
      userId,
    );
    return userToken ? convertingUserToken(userToken) : null;
  }

  async create(
    userId: number,
    entryTime: Date,
    expiredAt: Date,
  ): Promise<UserTokenModel> {
    return convertingUserToken(
      await this.userTokenReaderRepository.create(userId, entryTime, expiredAt),
    );
  }
}
