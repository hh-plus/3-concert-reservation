import { Module } from '@nestjs/common';
import { UserTokenService } from '../../applications/users/services/get-user-token.service';
import { UserController } from './user.controller';
import { UserRepositoryPort } from '../../applications/users/services/port/user.repository.port';
import { UserTokenRepository } from '../../infrastructures/users/repositories/user-token.repository';
import { PrismaService } from 'prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtManageService } from '../../applications/users/services/jwt.service';

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
    UserTokenService,
    JwtManageService,
    {
      provide: UserRepositoryPort,
      useClass: UserTokenRepository,
    },
  ],
})
export class UserModule {}
