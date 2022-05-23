import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity('grade')
export class GradeEntity {
  @PrimaryGeneratedColumn({ comment: '主键' })
  grade_id: number;

  @Column('int', { nullable: false, comment: '所属用户的id' })
  user_id: number;

  // 这里的需要确认是否需要
  // 顶部
  @Column('varchar', { length: 50, nullable: false, comment: '客户名称' })
  user_name: string;

  @Column('int', { nullable: false, comment: '现有资产余额' })
  balance: number;

  @Column('int', { nullable: false, comment: '原有信用等级' })
  old_grade: number;

  @Column('int', { nullable: false, comment: '资产总额' })
  total_assets: number;

  @Column('int', { nullable: false, comment: '负债总额' })
  total_liabilities: number;

  @Column('int', { nullable: false, comment: '所有者权益' })
  owner_equity: number;
  // 顶部

  // 基本信息
  @Column('varchar', { nullable: false, comment: '年龄' })
  age: number;

  @Column('int', { nullable: false, comment: '学历' })
  edu: number;

  @Column('int', { nullable: false, comment: '婚姻' })
  marriage: number;

  @Column('int', { nullable: false, comment: '健康状况' })
  health: number;

  @Column('int', { nullable: false, comment: '子女情况' })
  children: number;

  @Column('int', { nullable: false, comment: '所在单位类型' })
  unit_type: number;

  @Column('int', { nullable: false, comment: '职业职位' })
  position: number;

  @Column('int', { nullable: false, comment: '最近职业从业时间' })
  lately_time: number;

  @Column('int', {
    nullable: false,
    comment: '有无官方或者民间担任职务不能为空',
  })
  hold: number;

  @Column('int', { nullable: false, comment: '住所' })
  location: number;
  // 基本信息结束

  // 偿债能力

  @Column('int', { nullable: false, comment: '从事职业前景' })
  prospect: number;

  @Column('int', { nullable: false, comment: '社保缴纳记录' })
  social_security: number;

  @Column('int', { nullable: false, comment: '家庭净资产' })
  family_assets: number;

  @Column('int', {
    nullable: false,
    comment: '本人收入或家庭成员最高个人收入',
  })
  own_income: number;

  @Column('int', { nullable: false, comment: '家庭人均收入' })
  family_income: number;
  // 偿债能力

  // 信用记录
  @Column('int', { nullable: false, comment: '本人及配偶有无贷款记录' })
  own_mate_loan: number;

  @Column('int', { nullable: false, comment: '有无还款付息逾期' })
  overdue_repayment: number;

  @Column('int', { nullable: false, comment: '最长逾期记录' })
  max_overdue: number;

  @Column('int', { nullable: false, comment: '有无涉诉' })
  involved_appeal: number;

  @Column('int', { nullable: false, comment: '对外担保' })
  external_guarantee: number;
  // 信用记录结束

  // 平均和总分
  @Column('int', { comment: '基本信息总分' })
  bask_info_score: number;

  @Column('int', { comment: '偿债能力总分' })
  debt_pay_score: number;

  @Column('int', { comment: '信用记录总分' })
  credit_score: number;

  @Column('int', { comment: '总分' })
  all_score: number;

  @Column('int', { comment: '评级' })
  grade: number;

  @Column('int', { comment: '0:待审核 1:已审核2审核通过3:审核未通过' })
  status: number;

  @CreateDateColumn()
  create_time: number;

  @UpdateDateColumn()
  update_time: number;
}
