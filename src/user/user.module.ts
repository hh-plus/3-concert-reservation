import { Module } from '@nestjs/common';
import { GetUserTokenService } from './services/get-user-token.service';
import { UserController } from './user.controller';
import { UserRepositoryPort } from './services/port/user.repository.port';
import { UserTokenRepository } from './repositories/user-token.repository';
import { PrismaService } from 'prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';

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
    GetUserTokenService,
    {
      provide: UserRepositoryPort,
      useClass: UserTokenRepository,
    },
  ],
})
export class UserModule {}
