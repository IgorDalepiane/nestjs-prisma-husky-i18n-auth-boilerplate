import { Controller, Get } from '@nestjs/common';
import { User } from '@prisma/client';
import { CurrentUserId } from '@src/common/auth/decorators';
import { AuthUserResponseDto } from '@src/common/auth/dtos';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('all')
  async getAllUsers(): Promise<User[]> {
    return this.usersService.findMany({});
  }

  @Get('me')
  async whoAmI(@CurrentUserId() userId: string): Promise<AuthUserResponseDto | null> {
    return this.usersService.findLoggedUser({ id: userId });
  }
}
