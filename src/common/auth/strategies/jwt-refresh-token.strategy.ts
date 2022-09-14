import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { FastifyRequest } from 'fastify';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthJwtPayloadDto } from '../dtos';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private configService: ConfigService, private jwtService: JwtService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('ACCESS_TOKEN_SECRET'),
      ignoreExpiration: true,
      passReqToCallback: true,
    });
  }

  async validate(req: FastifyRequest, payload: AuthJwtPayloadDto) {
    const refresh_token = req.cookies.refresh_token;

    if (!refresh_token) {
      return false;
    }

    const unsignedRefreshToken = req.unsignCookie(refresh_token).value;

    if (!unsignedRefreshToken) {
      return false;
    }

    await this.jwtService.verifyAsync(unsignedRefreshToken, {
      secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
      subject: payload.sub,
      ignoreExpiration: false,
    });

    return { id: payload.sub };
  }
}
