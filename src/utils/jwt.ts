import * as jwt from 'jsonwebtoken';
import config from '../config';

/**
 *
 * @param data  要经过加密的数据
 * @returns token
 */
export const generateToken = (data: object) => {
  var token = jwt.sign(data, config.jwt.secret, {
    algorithm: config.jwt.alg,
    expiresIn: config.jwt.expire,
  });
  return token;
};

/**
 *
 * @param token  token字符串
 * @returns
 */
export const verifyToken = (token: string) => {
  console.log(token);
  var data = jwt.verify(token, config.jwt.secret);
  return data;
};
