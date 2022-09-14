import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtAccessTokenAuthGuard } from './common/auth/guards';
import { PrismaService } from './common/prisma/prisma.service';

@Module({
  providers: [
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: JwtAccessTokenAuthGuard,
    },
  ],
  exports: [PrismaService],
})
export class CommonModule {}
