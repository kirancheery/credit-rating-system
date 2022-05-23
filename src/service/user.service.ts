import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/userDto';
import { UserEntity } from '../entity/user.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import config from 'src/config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private user: Repository<UserEntity>,
  ) {}

  /**
   * 创建管理员
   * @param createUserDto
   * @returns
   */
  async create(createUserDto: CreateUserDto) {
    try {
      const isExist = await this.user.findOne({
        phonenumber: createUserDto.phonenumber,
      });
      if (isExist) {
        throw new HttpException('管理员已注册', 400);
      }
      await this.user.insert(createUserDto);
      // 插入成功没有返回数据，
      return null; // 这里的null和失败的null是有区别的
    } catch (error) {
      throw new HttpException(
        error.message ?? '数据插入失败',
        error.status ?? 500,
      );
    }
  }

  /**
   * 查找所有管理员或者用户
   * @param pageNo  可选第几页  config中配置默认
   * @param pageSize 可选一页显示几条 config中配置默认
   * @param user_type 可选是否查询普通用户：默认位true 普通用户
   * @returns
   */
  async findAll(
    pageNo = config.page.pageNumber,
    pageSize = config.page.pageSize,
    user_type = true,
  ) {
    try {
      const where = user_type ? { user_type: 1 } : { user_type: In([2, 3]) };
      const res = await this.user.findAndCount({
        // 查询没有被删除的，即del_flag为0
        where: {
          del_flag: '0',
          ...where,
        },
        // 那些字段返回
        select: [
          'user_id',
          'user_name',
          'user_type',
          'phonenumber',
          'create_time',
        ],
        // 分页
        skip: (pageNo - 1) * pageSize,
        take: pageSize,
      });
      // findAndCount 返回的是数组,第一个书数据,第二是总条数
      return res[0];
    } catch (error) {
      throw new HttpException(
        error.message ?? '查询所有失败',
        error.status ?? 500,
      );
    }
  }

  /**
   *
   * @param user_id 根据user_id 查找一个
   * @returns
   */
  async findOne(user_id: number): Promise<any> {
    try {
      const user = await this.user.find({
        where: { user_id },
        select: [
          'user_id',
          'user_name',
          'user_type',
          'phonenumber',
          'create_time',
        ],
      });
      if (!user || user.length <= 0) {
        throw new HttpException('用户id不正确', 404);
      }
      return user;
    } catch (error) {
      // 如果未找到用户，报错
      throw new HttpException(
        error.message ?? '数据查询失败',
        error.status ?? 500,
      );
    }
  }

  /**
   * 根据user_id 删除用户
   * @param user_id
   * @returns
   */
  async remove(user_id: number) {
    // 用户是软删除：数据还在，只是del_flag 为2 ：无法登录
    try {
      const update = await this.user.findOne({
        where: {
          user_id,
        },
      });
      if (!update) {
        // 这里的错误会被catch里捕获
        throw new HttpException('数据不存在,请重新提交', 400);
      }
      update.del_flag = '2';
      await this.user.save(update);
    } catch (error) {
      // 如果未找到用户，报错
      throw new HttpException(
        error.message ?? '数据更新失败',
        error.status ?? 500,
      );
    }
  }
}
