import * as crypto from 'crypto';
import config from '../config';
/**
 * Make salt
 */
export function makeSalt(): string {
  return crypto.randomBytes(3).toString('base64');
}

/**
 * Encrypt password
 * @param password 密码
 */
export function encryptPassword(password: string): string {
  if (!password) {
    return '';
  }
  const tempSalt = Buffer.from(config.salt, 'base64');
  return (
    // 10000 代表迭代次数 16代表长度
    crypto.pbkdf2Sync(password, tempSalt, 10000, 16, 'sha1').toString('base64')
  );
}
