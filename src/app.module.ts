import { Module } from '@nestjs/common/decorators/modules';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { AcceptLanguageResolver, I18nModule } from 'nestjs-i18n';
import * as path from 'path';
import { AuthModule } from './api/v1/auth/auth.module';
import { UsersModule } from './api/v1/users/users.module';
import { AppService } from './app.service';
import { CommonModule } from './common.module';
import { GlobalExceptionFilter } from './global-exception.filter';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        ACCESS_TOKEN_SECRET: Joi.string().required(),
        REFRESH_TOKEN_SECRET: Joi.string().required(),
        COOKIE_SIGNING_SECRET: Joi.string().required(),
        PORT: Joi.string().default('3000'),
      }),
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'pt-BR',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [AcceptLanguageResolver],
    }),
    UsersModule,
    AuthModule,
    CommonModule,
  ],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
