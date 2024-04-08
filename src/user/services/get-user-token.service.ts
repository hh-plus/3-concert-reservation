import { Injectable } from '@nestjs/common';
import { UserRepositoryPort } from './port/user.repository.port';

@Injectable()
export class GetUserTokenService {
  constructor(private readonly userRepositoryPort: UserRepositoryPort) {}
}
