import { ConflictException } from '@nestjs/common';
import { JwtManageService } from './jwt/jwt.service';
import { UserTokenModel } from './models/user-token.model';

export class UserDomainService {
  constructor(private readonly jwtManageService: JwtManageService) {}
}
