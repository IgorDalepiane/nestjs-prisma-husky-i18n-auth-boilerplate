import { Injectable } from '@nestjs/common/decorators/core';
import { UsersService } from '../users/users.service';
import { AuthUserResponseDto } from './dtos/auth-user-response.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  validateUser(username: string, password: string): AuthUserResponseDto | null {
    const user = this.usersService.findOne(username);

    if (user && user.password === password) {
      const { password, username, ...rest } = user;
      return rest;
    }

    return null;
  }
}
