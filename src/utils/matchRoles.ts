import {
  ExecutionContext,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { getRoles } from './token';
/**
 *
 * @param roles  自定义装饰器中的值：即这里声明了的角色，userRoles里是这个才能访问
 * @param userRoles    token中解析到的user_type
 * @returns
 */
export const matchRoles = async (
  roles: string[] | string,
  context: ExecutionContext,
): Promise<boolean> => {
  // 根据工具函数解析出token里携带的角色权限信息
  try {
    const userRoles = await getRoles(context);
    console.log('用户登录的权限是:', userRoles);
    //  roles: 装饰器中路由权限数组:需要是再这些数组里的权限才能访问，userRoles：token解码获取到的用户权限
    // 
    if (Array.isArray(roles)) {
      return roles.includes(userRoles);
    }
    throw new UnauthorizedException('matchRoles:无权访问');
  } catch (error) {
    throw new HttpException('matchRoles:无权访问', 403);
  }
};
