import { Module } from '@nestjs/common';
import { UserService } from '../../applications/users/services/user.service';
import { UserController } from './user.controller';
import { UserRepositoryPort } from '../../applications/users/services/port/user.repository.port';
import { UserTokenRepository } from '../../infrastructures/users/repositories/user-token.repository';
import { PrismaService } from 'prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtManageService } from '../../domains/users/jwt/jwt.service';
import { UserDomainService } from 'src/domains/users/user.domain.service';

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
    {
      provide: 'userServicePort',
      useClass: UserService,
    },
    {
      provide: UserRepositoryPort,
      useClass: UserTokenRepository,
    },
  ],
})
export class UserModule {}
