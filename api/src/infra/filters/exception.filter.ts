import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { HttpError } from '../../application/types/http-error.type';
import { ErrorCode } from '../../application/enums/error-codes';

@Catch()
export class ExceptionHandler implements ExceptionFilter {
  constructor(
    private readonly _httpAdapterHost: HttpAdapterHost,
    private _logger: Logger,
  ) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    this._logger.error(exception);
    const ctx = host.switchToHttp();
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const { httpAdapter } = this._httpAdapterHost;
    const responseBody: HttpError = {
      statusCode: httpStatus,
      message: exception.message as ErrorCode,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
