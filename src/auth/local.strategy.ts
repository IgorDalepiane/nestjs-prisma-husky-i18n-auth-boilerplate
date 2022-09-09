import { Injectable } from '@nestjs/common/decorators/core';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { AuthUserResponseDto } from './dtos/auth-user-response.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<AuthUserResponseDto | UnauthorizedException> {
    const user: AuthUserResponseDto | null = await this.authService.validateUser({ email, password });

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
