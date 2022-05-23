import { ExecutionContext, HttpException } from '@nestjs/common';

import { LoginException } from 'src/exception/login.exception';
import { verifyToken } from 'src/utils/jwt';

/**
 * 前端请求格式：header中：Authorization:Bearer token....
 *  从请求上下文中获取到token
 * @param context
 * @returns token
 */
const getToken = async (context: ExecutionContext): Promise<string> => {
  try {
    const request = context.switchToHttp().getRequest();
    const authorization = request.header('Authorization') || 'Bearer  ';
    const bearer = authorization.split(' ')[0];
    const token = authorization.split(' ')[1];
    if (bearer !== 'Bearer') {
      throw new LoginException('token格式不正确');
    }
    // token
    return token;
  } catch (error) {
    throw new LoginException('token获取错误，请重新登录');
  }
};

/**
 *  从上下文中获取角色信息,依赖token
 * @param context 上下文
 * @returns
 */
export const getRoles = async (context: ExecutionContext): Promise<string> => {
  try {
    // 获取token
    const tokenStr = await getToken(context);
    // 解析token、
    const user = verifyToken(tokenStr);
    // 从解析token中判断是否存在

    if (!user) {
      throw new HttpException('token无效,请重新登录', 403);
    }
    let type = user.user_type;
    //  硬编码
    switch (parseInt(type)) {
      case 1:
        return 'user';

      case 2:
        return 'admin';

      case 3:
        return 'super';

      default:
        break;
    }
  } catch (error) {
    console.log('getRoles:error', error);
    throw new HttpException('token错误,无权访问', 403);
  }
};

/**
 * 根据请求上下文获取token后判断token是否合法
 * @param context  请求上下文
 * @returns  boolean
 */
export const isLogin = async (context: ExecutionContext): Promise<boolean> => {
  try {
    // 获取token
    const tokenStr = await getToken(context);

    // 解析token、
    const user = verifyToken(tokenStr);
    // 从解析token中判断是否存在
    if (!user) {
      throw new HttpException('token无效,请重新登录', 403);
    }
    return true;
  } catch (error) {
    throw new HttpException('token错误,请登陆后操作', 403);
  }
};
