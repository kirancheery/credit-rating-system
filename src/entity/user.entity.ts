import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn({comment: '用户ID' })
  user_id: number; //  COMMENT '用户ID',

  @Column('varchar', { length: 30, nullable: false, comment: '用户名称' })
  user_name: string; // COMMENT '用户名称',

  @Column('int', {
    default: 1,
    comment: '用户类型:3 超管  2 普通管理员 1普通用户',
  })
  user_type: number; //  用户类型:3 超管2 普通管理员 1普通用户,

  @Column('varchar', {
    length: 50,
    nullable: false,
    default: '123@qq.com',
    comment: '用户邮箱',
  })
  email: string;

  @Column('varchar', {
    length: 11,
    default: '18312341234',
    comment: '手机号码',
    nullable: false,
  })
  phonenumber: string;

  @Column('varchar', {
    comment: '密码',
    nullable: false,
    select: false,// 查询时,不返回
  })
  password: string;

  @Column('varchar', {
    length: 1,
    default: '0',
    comment: '删除标志:0代表存在 2代表删除）',
  })
  del_flag: string;

  @CreateDateColumn()
  create_time: number;

  @UpdateDateColumn()
  update_time: number;
}
