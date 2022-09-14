import { Injectable } from '@nestjs/common/decorators/core';
import { comparePassword } from '@common/utils';
import { UsersService } from '../users/users.service';
import { AuthUserResponseMapper } from '@common/auth/mappers';
import { JwtService } from '@nestjs/jwt';
import { UserLogin } from '@src/common/users/dtos';
import { AuthJwtPayloadDto, AuthJwtResponseDto, AuthUserResponseDto } from '@src/common/auth/dtos';
import { ConfigService } from '@nestjs/config';
import { FastifyReply } from 'fastify';

const ACCESS_TOKEN_EXPIRATION = '1h';
const REFRESH_TOKEN_EXPIRATION = '7d';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

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

  async signin(userId: string, response: FastifyReply): Promise<AuthJwtResponseDto> {
    const payload: AuthJwtPayloadDto = { sub: userId };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
        expiresIn: ACCESS_TOKEN_EXPIRATION,
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
        expiresIn: REFRESH_TOKEN_EXPIRATION,
      }),
    ]);

    const SEVEN_DAYS_IN_SECONDS = 60 * 60 * 24 * 7;

    void response.setCookie('refresh_token', refresh_token, {
      httpOnly: true,
      maxAge: SEVEN_DAYS_IN_SECONDS,
      signed: true,
    });

    return { access_token };
  }
}
