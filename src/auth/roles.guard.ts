import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { matchRoles } from '../utils/matchRoles';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    console.log('路由需要的权限是:', roles);
    try {
      // 匹配是否有权限访问接口
      return await matchRoles(roles, context);
    } catch (error) {
      console.log('error', error);
      throw new ForbiddenException('无权访问');
    }
  }
  
}
