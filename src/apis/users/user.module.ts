import { Module } from '@nestjs/common';
import { UserService } from '../../applications/users/services/user.service';
import { UserController } from './user.controller';
import { UserTokenRepositoryPort } from '../../applications/users/services/port/user-token.repository.port';

import { PrismaService } from '@@prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtManageService } from '../../domains/users/jwt/jwt.service';
import { UserDomainService } from 'src/domains/users/user.domain.service';
import { UserTokenFactory } from 'src/infrastructures/users/repositories/user-token.factory';
import { UserTokenReaderRepository } from 'src/infrastructures/users/repositories/user-token/user-token.reader.repository';
import { UserTokenDomainService } from 'src/domains/users/user-token.domain.service';

import { UserFactory } from 'src/infrastructures/users/repositories/user.factory';
import { UserRepository } from 'src/infrastructures/users/repositories/user.repository';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '5m' },
    }),
  ],

  controllers: [UserController],
  providers: [
    PrismaService,
    UserDomainService,
    JwtManageService,
    UserTokenDomainService,
    {
      provide: 'userServicePort',
      useClass: UserService,
    },
    {
      provide: 'userRepositoryPort',
      useClass: UserFactory,
    },
    {
      provide: 'userTokenRepositoryPort',
      useClass: UserTokenFactory,
    },
    UserRepository,
    UserTokenReaderRepository,
  ],
})
export class UserModule {}
