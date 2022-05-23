import { LoggerService, LogLevel } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export interface configInterface {
  /**
   * 日志级别
   */
  loggerLevel: false | LoggerService | LogLevel[];
  /**
   * 端口号
   */
  port: number;
  /**
   * 全局路径前缀
   */
  globalPrefix: string;

  /**
   * pageSize  :  一页显示多少
   * pageNumber:  第几页
   */
  page: {
    pageSize: number;
    pageNumber: number;
  };

  /**
   * 数据库连接 : 注意entity的路径问题
   */
  typeOrm: TypeOrmModuleOptions;
  /**
   *
   * @param secret 密钥;
   * @param expire 过期时间 ;
   * @param issuer 发行者
   * @param alg 加密方式
   * 后续：jti (JWT ID)：编号 想法。放在redis里，让jwt黑名单
   *
   */
  jwt: {
    secret: string;
    expire: number | string;
    issuer: string;
    alg:
      | 'HS256'
      | 'HS384'
      | 'HS512'
      | 'RS256'
      | 'RS384'
      | 'RS512'
      | 'PS256'
      | 'PS384'
      | 'PS512'
      | 'ES256'
      | 'ES384'
      | 'ES512';
  };
  // 盐
  salt: string;

  /**
   * csurf jwt 形式基本不用考虑
   */
  /**
   * 不需要登录验证的请求地址
   */
  whiteList: string[];
}
