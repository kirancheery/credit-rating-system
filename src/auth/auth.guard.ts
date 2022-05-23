import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { isLogin } from '../utils/token';
import config from '../config';
const { whiteList, globalPrefix } = config;
@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const path = request.path;
    // 在白名单里的放行
    // 由于请求路径有全局的，所以要从这里截取并减1 /的问题
    if (whiteList.includes(path.substr(globalPrefix.length - 1))) {
      return true;
    }
    return await isLogin(context);
  }
}
