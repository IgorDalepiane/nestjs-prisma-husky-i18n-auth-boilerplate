import { Injectable } from '@nestjs/common/decorators/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtRefreshTokenAuthGuard extends AuthGuard('jwt-refresh') {}
