import { SetMetadata } from '@nestjs/common';


/**
 * user : 普通用户
 * admin :普通管理
 * super : 超管
 *  不使用该装饰器时，表示任何人都可以访问
 */
export const Roles = (...roles: string[]) => {
  return SetMetadata('roles', roles);
};
