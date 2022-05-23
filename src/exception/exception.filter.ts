import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
  HttpStatus,
  NotFoundException,
  UnauthorizedException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { fail } from '../utils/globalResponse';

@Catch()
export class ExFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: number;

    let message: string;

    if (exception instanceof NotFoundException) {
      status = exception.getStatus();
      message = exception.message ?? '404';
    }

    // 存入数据库时的失败
    if (exception instanceof QueryFailedError) {
      status = 501;
      message = exception.message ?? '存入失败,请检查数据';
    }
    //
    if (exception instanceof JsonWebTokenError) {
      status = 401;
      message = 'token错误:JsonWebTokenError';
    }
    if (exception instanceof TokenExpiredError) {
      status = 401;
      message = 'token错误:TokenExpiredError';
    }
    // 前端传递参数错误
    if (exception instanceof BadRequestException) {
      status = HttpStatus.BAD_REQUEST;
      message = exception.message ?? '请求参数错误';
    }

    if (exception instanceof UnauthorizedException) {
      status = HttpStatus.UNAUTHORIZED;
      message = exception.message ?? '认证失败,请检查账户密码';
    }
    if (exception instanceof ForbiddenException) {
      status = exception.getStatus();
      message = '当前账户无权限进行该操作';
    }
    //
    if (exception instanceof HttpException) {
      // TODO: forbiddenException  为什么会走这里？
      console.log(exception);

      status = exception.getStatus() ?? HttpStatus.INTERNAL_SERVER_ERROR;
      message = exception.message ?? '未知错误';
    }
    response.status(status ?? 500).json(fail(status, message));
    Logger.error(
      '请求地址: ' +
        request.url +
        '  请求方法: ' +
        request.method +
        ' 错误: ' +
        exception,
    );
  }
}
