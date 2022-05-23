import { HttpStatus } from '@nestjs/common';

let ok = (data?: any) => {
  return {
    code: 200,
    success: true,
    message: 'ok',
    data: data ?? null,
  };
};

let fail = (code: HttpStatus, message?: string) => {
  return {
    code: code ?? HttpStatus.INTERNAL_SERVER_ERROR,
    success: false,
    message: message ?? 'INTERNAL_SERVER_ERROR',
    data: null,
  };
};

export { ok, fail };
