import { HttpStatus, HttpException } from '@nestjs/common';

/**
 * 默认
 * msg = '登录错误', code = 401
 * 可自定义
 */

export class LoginException extends HttpException {
  constructor(msg = '登录错误', code = 401) {
    super(msg, code);
  }
}
