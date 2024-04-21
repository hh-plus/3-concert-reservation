import {
  ConflictException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { UserTokenRepositoryPort } from './port/user-token.repository.port';

import { JwtManageService } from '../../../domains/users/jwt/jwt.service';
import { UserToken } from '@prisma/client';
import { UserDomainService } from 'src/domains/users/user.domain.service';
import { UserValidateService } from 'src/domains/users/validate/user.validate.service';
import { checkExistUserToken } from 'src/domains/users/validate/user-token.validate';
import { UserTokenDomainService } from 'src/domains/users/user-token.domain.service';
import { userRepositoryPort } from './port/user.repository.port';

@Injectable()
export class UserService {
  constructor(
    @Inject('userTokenRepositoryPort')
    private readonly userTokenRepositoryPort: UserTokenRepositoryPort,
    @Inject('userRepositoryPort')
    private readonly userRepository: userRepositoryPort,
    private readonly userDomainService: UserDomainService,
    private readonly jwtManageService: JwtManageService,
    private readonly userTokenDomainService: UserTokenDomainService,
  ) {}

  public async getOrCreate(userId: number): Promise<{ token: string }> {
    const user = await this.userRepository.getOneById(userId);

    if (!user) {
      throw new NotFoundException('not found user');
    }

    const existUserToken =
      await this.userTokenRepositoryPort.getUserTokenByUserId(userId);

    checkExistUserToken(existUserToken);

    const tokens = await this.userTokenRepositoryPort.getAll();
    const waitingNumber = this.userTokenDomainService.getWaitingCount(tokens);

    const entryTime = this.jwtManageService.getEntryTime(waitingNumber);

    const token = this.jwtManageService.sign({
      userId,
      entryTime,
      waitingNumber,
    });
    await this.userTokenRepositoryPort.create(
      userId,
      entryTime,
      this.jwtManageService.getExpiredAt(entryTime),
    );

    return {
      token,
    };
  }
}
