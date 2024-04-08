import { Injectable } from '@nestjs/common';
import { UserRepositoryPort } from './port/user.repository.port';

@Injectable()
export class GetUserTokenService {
  constructor(private readonly userRepositoryPort: UserRepositoryPort) {}

  public async getUserToken(userId: number) {
    return await this.userRepositoryPort.getUserToken(userId);
  }

  public async createUserToken(userId: number) {
    return await this.userRepositoryPort.createUserToken(userId);
  }
}
