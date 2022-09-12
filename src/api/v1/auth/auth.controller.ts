import { Body, Controller, Post, UseFilters, UseGuards } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaClientKnownRequestErrorFilter } from '@common/prisma/filters';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { AuthUserResponseDto } from '@common/auth/dtos';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UsersService, private readonly authService: AuthService) {}

  @Post('signup')
  @UseFilters(new PrismaClientKnownRequestErrorFilter())
  async signupUser(@Body() userData: Prisma.UserCreateInput): Promise<User> {
    return await this.usersService.createUser(userData);
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signinUser(
    @Body() userData: Pick<Prisma.UserCreateInput, 'email' | 'password'>,
  ): Promise<AuthUserResponseDto | null> {
    return await this.authService.validateUser(userData);
  }
}
