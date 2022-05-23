import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsNumber, MaxLength } from 'class-validator';

export {
  CreateGradeDto,
  UpdateGradeDTO,
  DeleteByUserIdDto,
  DeleteByGradeIdDto,
};

class CreateGradeDto {
  // 顶部
  @ApiProperty({ example: '客户' })
  @MaxLength(50, { message: '客户名称不能超过50' })
  @IsNotEmpty({ message: '客户名称不能为空' })
  readonly user_name: string;

  @ApiProperty({ example: 1 })
  @IsNumber({}, { message: '现有资产余额需要是数字' })
  @IsNotEmpty({ message: '现有资产余额不能为空' })
  readonly balance: number;

  @ApiProperty({ example: 1 })
  @IsNumber({}, { message: '原有信用等级需要是数字' })
  @IsNotEmpty({ message: '原有信用等级不能为空' })
  readonly old_grade: number;

  @ApiProperty({ example: 1 })
  @IsNumber({}, { message: '资产总额需要是数字' })
  @IsNotEmpty({ message: '资产总额不能为空' })
  readonly total_assets: number;

  @ApiProperty({ example: 1 })
  @IsNumber({}, { message: '负债总额需要是数字' })
  @IsNotEmpty({ message: '负债总额不能为空' })
  readonly total_liabilities: number;

  @ApiProperty({ example: 1 })
  @IsNumber({}, { message: '所有者权益需要是数字' })
  @IsNotEmpty({ message: '所有者权益不能为空' })
  readonly owner_equity: number;

  // 基本信息

  @ApiProperty({ example: 1 })
  @IsNumber({}, { message: '年龄选项需要是数字' })
  @IsIn([1, 2, 3], { message: '年龄选项得分可选有1,2,3' })
  @IsNotEmpty({ message: '年龄不能为空' })
  readonly age: number;

  @ApiProperty({ example: 4 })
  @IsNumber({}, { message: '学历选项需要是数字' })
  @IsIn([1, 2, 3, 4, 0], { message: '学历选项可选有0,1,2,3,4' })
  @IsNotEmpty({ message: '学历不能为空' })
  readonly edu: number;

  @ApiProperty({ example: 1 })
  @IsNumber({}, { message: '婚宴情况选项需要是数字' })
  @IsIn([0, 1, 2, 3, 4, 5], { message: '婚宴情况选项可选有0,1,2,3,4,5' })
  @IsNotEmpty({ message: '婚姻情况不能为空' })
  readonly marriage: number;

  @ApiProperty({ example: 1 })
  @IsNumber({}, { message: '健康状态选项需要是数字' })
  @IsIn([0, 1, 2], { message: '健康状态选项可选有0,1,2' })
  @IsNotEmpty({ message: '健康状态不能为空' })
  readonly health: number;

  @ApiProperty({ example: 2 })
  @IsNumber({}, { message: '子女选项需要是数字' })
  @IsIn([0, 2, 4], { message: '子女选项可选有0,2,4' })
  @IsNotEmpty({ message: '子女不能为空' })
  readonly children: number;

  @ApiProperty({ example: 1 })
  @IsNumber({}, { message: '所在单位类型选项需要是数字' })
  @IsIn([0, 1, 2, 3, 4, 5], { message: '所在单位类型选项可选有0,1,2,3,4,5' })
  @IsNotEmpty({ message: '所在单位类型不能为空' })
  readonly unit_type: number;

  @ApiProperty({ example: 1 })
  @IsNumber({}, { message: '职业职位选项需要是数字' })
  @IsIn([0, 1, 3, 5], { message: '职业职位选项可选有0,1,3,5' })
  @IsNotEmpty({ message: '职业职位' })
  readonly position: number;

  @ApiProperty({ example: 1 })
  @IsNumber({}, { message: '最近从业时间选项需要是数字' })
  @IsIn([4,3,2,1], { message: '最近从业时间选项可选有4,3,2,1' })
  @IsNotEmpty({ message: '最近从业时间不能为空' })
  readonly lately_time: number;

  @ApiProperty({ example: 2 })
  @IsNumber({}, { message: '有无官方或者民间担任职务选项需要是数字' })
  @IsIn([0, 2], { message: '有无官方或者民间担任职务选项可选有0,2' })
  @IsNotEmpty({ message: '有无官方或者民间担任职务不能为空' })
  readonly hold: number;

  @ApiProperty({ example: 1 })
  @IsNumber({}, { message: '住所选项需要是数字' })
  @IsIn([0, 1], { message: '住所选项可选有0,1' })
  @IsNotEmpty({ message: '住所不能为空' })
  readonly location: number;

  // 偿债能力
  @ApiProperty({ example: 1 })
  @IsNumber({}, { message: '从事职业前景选项需要是数字' })
  @IsIn([1, 2, 3], { message: '从事职业前景选项可选有1,2,3' })
  @IsNotEmpty({ message: '从事职业前景不能为空' })
  readonly prospect: number;

  @ApiProperty({ example: 1 })
  @IsNumber({}, { message: '社保缴纳记录选项需要是数字' })
  @IsIn([0, 1, 2, 3], { message: '社保缴纳记录选项可选有0,1,2,3' })
  @IsNotEmpty({ message: '社保缴纳记录不能为空' })
  readonly social_security: number;

  @ApiProperty({ example: 1 })
  @IsNumber({}, { message: '家庭净资产值选项需要是数字' })
  @IsIn([0, 1, 3, 5, 8, 10, 15], { message: '家庭净资产值可选0,1,3,5,8,10,15' })
  @IsNotEmpty({ message: '家庭净资产不能为空' })
  readonly family_assets: number;

  @ApiProperty({ example: 10 })
  @IsNumber({}, { message: '本人收入或家庭成员最高个人收入选项需要是数字' })
  @IsIn([12, 10, 8, 5, 3, 1], {
    message: '本人收入或家庭成员最高个人收入可选12, 10, 8, 5, 3, 1',
  })
  @IsNotEmpty({ message: '本人收入或家庭成员最高个人收入不能为空' })
  readonly own_income: number;

  @ApiProperty({ example: 12 })
  @IsNumber({}, { message: '家庭人均收入选项需要是数字' })
  @IsIn([12, 10, 8, 5, 3, 1], {
    message: '家庭人均收入可选12,10, 8, 5, 3, 1',
  })
  @IsNotEmpty({ message: '家庭人均收入不能为空' })
  readonly family_income: number;

  // 信用记录
  @ApiProperty({ example: 3 })
  @IsNumber({}, { message: '本人及配偶有无贷款记录选项需要是数字' })
  @IsIn([3, 0], {
    message: '本人及配偶有无贷款记录可选0,3',
  })
  @IsNotEmpty({ message: '本人及配偶有无贷款记录不能为空' })
  readonly own_mate_loan: number;

  @ApiProperty({ example: 5 })
  @IsNumber({}, { message: '有无还款付息逾期选项需要是数字' })
  @IsIn([5, 3, 0], {
    message: '有无还款付息逾期可选5,0,3',
  })
  @IsNotEmpty({ message: '有无还款付息逾期不能为空' })
  readonly overdue_repayment: number;

  @ApiProperty({ example: 6 })
  @IsNumber({}, { message: '最长逾期选项需要是数字' })
  @IsIn([6, 3, 0], {
    message: '最长逾期可选6,0,3',
  })
  @IsNotEmpty({ message: '最长逾期记录不能为空' })
  readonly max_overdue: number;

  @ApiProperty({ example: 5 })
  @IsNumber({}, { message: '有无涉诉选项需要是数字' })
  @IsIn([5, 0], {
    message: '有无涉诉可选5,0 ',
  })
  @IsNotEmpty({ message: '有无涉诉不能为空' })
  readonly involved_appeal: number;

  @ApiProperty({ example: 1 })
  @IsNumber({}, { message: '对外担保选项需要是数字' })
  @IsIn([1, 0], {
    message: '对外担保可选0,1',
  })
  @IsNotEmpty({ message: '对外担保不能为空' })
  readonly external_guarantee: number;

  @ApiProperty({ example: 1 })
  @IsNumber({}, { message: '用户id需是数字' })
  @IsNotEmpty({ message: '用户id不能为空' })
  readonly user_id: number;
}
class UpdateGradeDTO {
  @ApiProperty({ example: 3 })
  @IsNumber({}, { message: '更新状态需要是数字' })
  @IsNotEmpty({ message: '更新状态不能为空' })
  @IsIn([0, 1, 2, 3], {
    message: '状态只能是0:待审核 1:已审核2审核通过,3:审核未通过其中一个',
  })
  readonly status: number;

  @ApiProperty({ example: 200 })
  @IsNumber({}, { message: '评分id需要是数字' })
  @IsNotEmpty({ message: '评分id不能为空' })
  readonly grade_id: number;
}
class DeleteByUserIdDto {
  @ApiProperty({ example: 1 })
  @IsNumber({}, { message: '用户id需要是数字' })
  @IsNotEmpty({ message: '用户id不能为空' })
  readonly user_id: number;
}

class DeleteByGradeIdDto {
  @ApiProperty({ example: 1 })
  @IsNumber({}, { message: '评分id需要是数字' })
  @IsNotEmpty({ message: '评分id不能为空' })
  readonly grade_id: number;
}
