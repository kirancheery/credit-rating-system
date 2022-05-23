import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entity';
import { LoginDto, RegisterDto } from '../dto/login.dto';
/* import { encryptPassword } from '../utils/encryptPassword'; */
import { generateToken } from '../utils/jwt';
import { LoginException } from 'src/exception/login.exception';
import { encryptPassword } from 'src/utils/encryptPassword';
@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(UserEntity)
    private user: Repository<UserEntity>,
  ) {}

  /**
   *  用户和管理员都是同一个登录接口
   * @param LoginDto
   * @returns
   */
  async login(loginDto: LoginDto) {
    try {
      const user = await this.user.findOne({
        where: {
          phonenumber: loginDto.phonenumber,
          password: encryptPassword(loginDto.password),
          user_type: loginDto.user_type,
          // 未被删除的用户才能登录
          del_flag: '0',
        },
      });
      if (user) {
        // 生成token
        const token = await generateToken({
          user_id: user.user_id,
          user_type: user.user_type,
        });
        return { token, user_id: user.user_id, user_name: user.user_name };
      } else {
        throw new HttpException('登录失败，请检查账户密码以及登录类型', 403);
      }
    } catch (error) {
      throw new UnauthorizedException('登录失败，请检查账户密码以及登录类型');
    }
  }

  /**
   * 普通用户注册
   * @param registerDto
   * @returns
   */
  async register(registerDto: RegisterDto) {
    try {
      const phonenumber = registerDto.phonenumber;
      const password = encryptPassword(registerDto.password);
      const email = registerDto.email;
      const user_name = registerDto.user_name;
      const userIsExist = await this.IsExist(phonenumber);
      // 判断用户是否已注册 由于注册只会是普通用户,所以忽略管理员，管理员直接后台添加时，在判断。
      if (userIsExist.isExist) {
        throw new LoginException('用户已注册');
      }
      await this.user.insert({
        phonenumber,
        password,
        email,
        user_name,
        // 固定为普通用户
        user_type: 1,
      });
      return null;
    } catch (error) {
      throw new LoginException(error.message ?? '注册失败');
    }
  }

  /**
   * 根据手机号查看用户是否注册
   * @param phonenumber
   * @returns
   */
  async IsExist(phonenumber: string) {
    const user = await this.user.findOne({
      phonenumber,
    });
    console.log(user);
    if (!user) return { isExist: false };
    return { isExist: true };
  }
}
