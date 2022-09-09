import { Injectable } from '@nestjs/common/decorators/core';
import { Prisma } from '@prisma/client';
import { UsersService } from '../users/users.service';
import { AuthUserResponseDto } from './dtos/auth-user-response.dto';
import { AuthUserResponseMapper } from './mappers/auth-user-response.mapper';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser({
    email,
    password,
  }: Pick<Prisma.UserCreateInput, 'email' | 'password'>): Promise<AuthUserResponseDto | null> {
    const user = await this.usersService.findUnique({ email });

    if (!user) {
      return null;
    }

    if (user.password === password) {
      return AuthUserResponseMapper.map(user);
    }

    return null;
  }
}
