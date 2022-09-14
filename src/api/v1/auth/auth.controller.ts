import { AuthJwtResponseDto } from '@common/auth/dtos';
import { PrismaClientKnownRequestErrorFilter } from '@common/prisma/filters';
import { Body, Controller, Post, Res, UseFilters, UseGuards } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { CurrentUserId, Public } from '@src/common/auth/decorators';
import { JwtRefreshTokenAuthGuard, LocalAuthGuard } from '@src/common/auth/guards';
import { FastifyReply } from 'fastify';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UsersService, private readonly authService: AuthService) {}

  @UseFilters(new PrismaClientKnownRequestErrorFilter())
  @Post('signup')
  async signupUser(@Body() userData: Prisma.UserCreateInput): Promise<User> {
    return await this.usersService.createUser(userData);
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signinUser(
    @CurrentUserId() userId: string,
    @Res({ passthrough: true }) response: FastifyReply,
  ): Promise<AuthJwtResponseDto> {
    return await this.authService.signin(userId, response);
  }

  @UseGuards(JwtRefreshTokenAuthGuard)
  @Post('refresh')
  async refreshToken(
    @CurrentUserId() userId: string,
    @Res({ passthrough: true }) response: FastifyReply,
  ): Promise<AuthJwtResponseDto> {
    return await this.authService.signin(userId, response);
  }
}
