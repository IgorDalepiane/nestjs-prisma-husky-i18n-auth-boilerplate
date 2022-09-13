import { Injectable } from '@nestjs/common/decorators/core';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthUserResponseDto } from '@common/auth/dtos/auth-user-response.dto';
import { AuthService } from '@src/api/v1/auth/auth.service';

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
