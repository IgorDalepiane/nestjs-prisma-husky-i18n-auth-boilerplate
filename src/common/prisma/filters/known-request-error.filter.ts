import { ArgumentsHost, Catch, ExceptionFilter, InternalServerErrorException, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { FastifyReply } from 'fastify';
import { getI18nContextFromArgumentsHost } from 'nestjs-i18n';
import { UserAlreadyExistsException } from '../../users/exceptions';
import { PrismaError } from '../constants/error-codes';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientKnownRequestErrorFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const i18n = getI18nContextFromArgumentsHost(host);

    let exceptionToReturn = new InternalServerErrorException(
      undefined,
      i18n.t('exceptions.internal-server-error'),
    );

    if (exception.code === PrismaError.UniqueConstraintViolation) {
      exceptionToReturn = new UserAlreadyExistsException(i18n.t('exceptions.user-already-exists'));
    }

    Logger.error(exception);

    void response
      .code(exceptionToReturn.getStatus())
      .send({ statusCode: exceptionToReturn.getStatus(), message: exceptionToReturn.message });
  }
}
