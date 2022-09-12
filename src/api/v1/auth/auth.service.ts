import { Injectable } from '@nestjs/common/decorators/core';
import { Prisma } from '@prisma/client';
import { comparePassword } from '@common/utils';
import { UsersService } from '../users/users.service';
import { AuthUserResponseDto } from '@common/auth/dtos';
import { AuthUserResponseMapper } from '@common/auth/mappers';

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

    if (await comparePassword(password, user.password)) {
      return AuthUserResponseMapper.map(user);
    }

    return null;
  }
}
