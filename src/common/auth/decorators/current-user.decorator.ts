import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { AuthUserResponseDto } from '../dtos';

export const CurrentUser = createParamDecorator((_, ctx: ExecutionContext): AuthUserResponseDto => {
  const request = ctx.switchToHttp().getRequest<FastifyReply & { user: AuthUserResponseDto }>();
  return request.user;
});
