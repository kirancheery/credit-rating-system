import { configInterface } from '../interface/config.interface';
const config: configInterface = {
  whiteList: ['/auth/login', '/auth/register', '/auth/exist'],

  jwt: {
    secret: 'qwertgbvfdc#@!',
    expire: '1h',
    alg: 'HS256',
    issuer: 'mnbvcxz',
  },
  salt: '123asda53123#@!',
  loggerLevel: ['error', 'warn', 'log'],
  globalPrefix: '/api/',

  page: {
    pageSize: 10,
    pageNumber: 1,
  },

  typeOrm: {
    type: 'mysql',
    host: 'localhost',
    port: 3306, //  替换为3306
    username: 'root',
    password: '123456', //  替换为自己的密码
    database: 'creadit', //  替换
    synchronize: false,
    autoLoadEntities: true,
    logging: ['error'],
  },

  port: 3000,
};

export default config;
