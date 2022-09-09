import { Controller } from '@nestjs/common/decorators/core';
import { Get, Request } from '@nestjs/common/decorators/http';
import { AppService } from './app.service';
import { LoginCredentialsDto } from './auth/dtos/login-credentials.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('protected')
  getHello(@Request() req: LoginCredentialsDto): string {
    return req.username;
  }
}
