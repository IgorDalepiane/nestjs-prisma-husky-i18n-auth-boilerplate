import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { getI18nContextFromArgumentsHost } from 'nestjs-i18n';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const i18n = getI18nContextFromArgumentsHost(host);

    let exceptionToReturn = new InternalServerErrorException(
      undefined,
      i18n.t('exceptions.internal-server-error'),
    );

    if (exception instanceof HttpException) {
      exceptionToReturn = exception;
    }

    Logger.error(exception);

    void response
      .code(exceptionToReturn.getStatus())
      .send({ statusCode: exceptionToReturn.getStatus(), message: exceptionToReturn.message });
  }
}
