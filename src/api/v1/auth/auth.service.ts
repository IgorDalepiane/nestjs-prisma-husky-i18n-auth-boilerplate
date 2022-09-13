import { Injectable } from '@nestjs/common/decorators/core';
import { comparePassword } from '@common/utils';
import { UsersService } from '../users/users.service';
import { AuthUserResponseMapper } from '@common/auth/mappers';
import { JwtService } from '@nestjs/jwt';
import { UserLogin } from '@src/common/users/dtos';
import { AuthJwtPayloadDto, AuthJwtResponseDto, AuthUserResponseDto } from '@src/common/auth/dtos';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser({ email, password }: UserLogin): Promise<AuthUserResponseDto | null> {
    const user = await this.usersService.findUnique({ email });

    if (!user) {
      return null;
    }

    if (await comparePassword(password, user.password)) {
      return AuthUserResponseMapper.map(user);
    }

    return null;
  }

  login(user: AuthUserResponseDto): AuthJwtResponseDto {
    const payload: AuthJwtPayloadDto = { sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
