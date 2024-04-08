import { Injectable } from '@nestjs/common';
import { UserRepositoryPort } from './port/user.repository.port';

@Injectable()
export class UserTokenService {
  private readonly maxCount: number;
  constructor(private readonly userRepositoryPort: UserRepositoryPort) {
    this.maxCount = 10;
  }

  public async getOneByUserId(userId: number) {
    return await this.userRepositoryPort.getOne(userId);
  }

  public async getAll() {
    return await this.userRepositoryPort.getAll();
  }

  public async create(userId: number) {
    return await this.userRepositoryPort.create(userId);
  }

  public async createNewToken(userId: number, count: number) {}

  public async getOrCreate(userId: number) {
    const existUserToken = this.getOneByUserId(userId);

    if (!existUserToken) {
      const tokens = await this.getAll();
      if (tokens.length >= this.maxCount) {
      }
    }
    if (existUserToken) {
      return existUserToken;
    }
  }
}
