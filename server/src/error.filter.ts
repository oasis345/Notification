import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class ErrorFilter implements ExceptionFilter {
  private readonly logger = new Logger(ErrorFilter.name);

  catch(error: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = error instanceof HttpException ? error.getStatus() : 500;
    if (statusCode == 404) {
      this.logger.warn(error.message);
      response.status(statusCode).send();
      return;
    }

    if (error.cause) {
      this.logger.error(error.cause.message, error.cause.stack);
    }
    this.logger.error(error.message, error.stack);

    const errorResponse = {
      name: error.constructor?.name,
      statusCode,
      ...error,
      message: error.message,
      unexpected: error.unexpected ?? true,
    };

    response.status(statusCode).json(errorResponse);
  }
}
