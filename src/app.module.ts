import { Module } from '@nestjs/common/decorators/modules';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, AuthModule, CommonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
