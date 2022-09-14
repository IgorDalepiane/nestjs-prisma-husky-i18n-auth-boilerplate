import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FastifyReply } from 'fastify';

export const CurrentUserId = createParamDecorator((_, ctx: ExecutionContext): string => {
  const request = ctx.switchToHttp().getRequest<FastifyReply & { user: { id: string } }>();
  return request.user.id;
});
