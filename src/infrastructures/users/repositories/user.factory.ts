import { Injectable } from '@nestjs/common';
import { userRepositoryPort } from 'src/applications/users/services/port/user.repository.port';
import { UserRepository } from './user.repository';
import { convertUser } from '../mappers/user.mapper';
import { UserModel } from 'src/applications/users/models/user.model';

@Injectable()
export class UserFactory implements userRepositoryPort {
  constructor(private readonly userRepository: UserRepository) {}

  async getOneById(userId: number): Promise<UserModel | null> {
    const user = await this.userRepository.getOne(userId);
    return user ? convertUser(user) : null;
  }
}
