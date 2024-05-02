import { MiddlewareConsumer, Module } from '@nestjs/common';
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
import { ValidateWaitTokenMiddleware } from 'src/guard/redis/validate-token.guard';

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
      provide: 'userTokenRepositoryPort',
      useClass: UserTokenFactory,
    },

    UserTokenReaderRepository,
  ],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateWaitTokenMiddleware)
      .forRoutes('/user/:userId/token');
  }
}
