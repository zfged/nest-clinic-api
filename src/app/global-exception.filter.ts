import { Catch, ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest();
    
        const status = exception instanceof HttpException ? exception.getStatus() : 500;
        var a = exception.stack.split(/\r?\n/).map(item => item.trim())
        const errorResponse = {
          statusCode: status,
          timestamp: new Date().toISOString(),
          path: request.url,
          method: request.method,
          message: exception?.response?.message || exception.message || 'Internal Server Error',
          stack: a || null,
          response:exception.response || {}
        };
        console.log(a);
        // Запись ошибки в журнал
        console.error(errorResponse);
    
        response.status(status).json(errorResponse);
      }
}