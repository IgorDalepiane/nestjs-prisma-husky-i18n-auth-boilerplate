import { Module } from '@nestjs/common/decorators/modules';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessTokenStrategy, JwtRefreshTokenStrategy, LocalStrategy } from '@src/common/auth/strategies';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UsersModule, PassportModule, ConfigModule, JwtModule.register({})],
  providers: [AuthService, LocalStrategy, JwtAccessTokenStrategy, JwtRefreshTokenStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
