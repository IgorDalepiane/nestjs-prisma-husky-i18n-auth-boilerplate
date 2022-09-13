import { AuthJwtResponseDto, AuthUserResponseDto } from '@common/auth/dtos';
import { PrismaClientKnownRequestErrorFilter } from '@common/prisma/filters';
import { Body, Controller, Post, UseFilters, UseGuards } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { CurrentUser, Public } from '@src/common/auth/decorators';
import { LocalAuthGuard } from '@src/common/auth/guards';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

@Public()
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
  signinUser(@CurrentUser() user: AuthUserResponseDto): AuthJwtResponseDto {
    return this.authService.login(user);
  }
}
