import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGradeDto } from '../dto/gradeDto';
import { GradeEntity } from '../entity/grade.entity';
import { FindOneOptions, Like, Repository } from 'typeorm';
import sum from '../utils/sum';
import { UserEntity } from '../entity/user.entity';
import config from '../config';
@Injectable()
export class GradeService {
  constructor(
    @InjectRepository(GradeEntity)
    private grade: Repository<GradeEntity>,
    @InjectRepository(UserEntity)
    private user: Repository<UserEntity>,
  ) {}

  /**
   * 根据用户查找评级详情
   * 如果用户可以提交多个审核，那么这个API则存在，否则删除下面的代码
   * @returns
   */
  async findOneByUserId(user_id: number) {
    const gradeListByUserId = await this.grade.find({
      where: {
        user_id,
      },
      select: [
        'grade_id',
        'user_name',
        'user_id',
        'status',
        'bask_info_score',
        'debt_pay_score',
        'credit_score',
        'all_score',
        'create_time',
        'update_time',
        'grade',
        'old_grade',
      ],
    });
    if (!gradeListByUserId || gradeListByUserId.length <= 0) {
      throw new HttpException('用户id不正确', 404);
    }
    return gradeListByUserId;
  }

  /**
   * 创建评级
   * @param createGradeDto
   * @returns
   */
  async insert(createGradeDto: CreateGradeDto): Promise<any> {
    try {
      const {
        age,
        edu,
        marriage,
        health,
        children,
        unit_type,
        position,
        lately_time,
        hold,
        location,
        prospect,
        social_security,
        family_assets,
        own_income,
        family_income,
        own_mate_loan,
        overdue_repayment,
        max_overdue,
        involved_appeal,
        external_guarantee,
        user_id,
      } = createGradeDto;
      const hasUser = await this.user.findOne({
        where: {
          user_id,
        },
      });
      if (!hasUser) {
        // 注意，这里正常情况时可以不需要的：user_id 是前端登录后返回的，但是为了更安全，再检验一次user_id
        throw new HttpException('创建时传入的user_id错误', 403);
      }

      // 后端计算总分：
      const bask_info_score = sum(
        age,
        edu,
        marriage,
        health,
        children,
        unit_type,
        position,
        lately_time,
        hold,
        location,
      );
      // 偿债能力总分
      const debt_pay_score = sum(
        prospect,
        social_security,
        family_assets,
        own_income,
        family_income,
      );
      // 信用记录总分
      const credit_score = sum(
        own_mate_loan,
        overdue_repayment,
        max_overdue,
        involved_appeal,
        external_guarantee,
      );
      // 所有总分
      const all_score = sum(bask_info_score, debt_pay_score, credit_score);
      console.log(
        '总分=>',
        all_score,
        '基本信息得分=>',
        bask_info_score,
        '偿债能力得分=>',
        debt_pay_score,
        '信用记录得分=>',
        credit_score,
      );

      let grade;
      if (all_score <= 20) {
        grade = 1;
      }
      if (all_score > 20 && all_score <= 40) {
        grade = 2;
      }
      if (all_score > 40 && all_score <= 60) {
        grade = 3;
      }
      if (all_score > 60 && all_score <= 80) {
        grade = 4;
      }
      if (all_score > 80 && all_score <= 100) {
        grade = 5;
      }
 
      const sqlValue = {
        ...createGradeDto,
        all_score,
        bask_info_score,
        debt_pay_score,
        credit_score,
        grade,
      };

      await this.grade.insert(sqlValue);
      return { all_score, grade };
    } catch (error) {
      throw new HttpException(error.message ?? '插入失败', error.status ?? 500);
    }
  }
  /**
   * 所有评级列表
   * @returns
   */
  async findAll(
    pageNo = config.page.pageNumber,
    pageSize = config.page.pageSize,
  ) {
    try {
      const res = await this.grade.findAndCount({
        // 那些字段返回
        select: [
          'grade_id',
          'user_name',
          'user_id',
          'status',
          'bask_info_score',
          'debt_pay_score',
          'credit_score',
          'all_score',
          'create_time',
          'update_time',
          'grade',
          'old_grade',
        ],
        // 分页
        skip: (pageNo - 1) * pageSize,
        take: pageSize,
      });
      return res[0];
    } catch (error) {
      throw new HttpException(error.message ?? '查询失败', error.status ?? 500);
    }
  }

  /**
   *  更新评分审核
   * @param updateGradeDTO
   */
  async update(updateGradeDTO) {
    try {
      const update = await this.grade.findOne({
        where: {
          grade_id: updateGradeDTO.grade_id,
        },
      });
      if (!update) {
        // 这里的错误会被catch里捕获
        throw new HttpException('数据不存在,请重新提交', 400);
      }
      (update.status = updateGradeDTO.status), await this.grade.save(update);
      return null;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        error.message ?? '数据更新失败',
        error.status ?? 500,
      );
    }
  }

  /**
   *  根据评分主键删除该评分
   * @param updateGradeDTO
   */
  async remove(deleteByGradeIdDto) {
    try {
      const { grade_id } = deleteByGradeIdDto;
      const isGreade = await this.grade.findOne({
        where: {
          grade_id,
        },
      });
      if (!isGreade) {
        throw new HttpException('此评分表不存在', 400);
      }
      // 真实删除
      return await this.grade.delete(grade_id);
    } catch (error) {
      throw new HttpException(error.message ?? '删除失败', error.status ?? 500);
    }
  }
  /**
   * 根据用户名称查找评级
   * 返回的只是总分这些 是否过审这些。要看详情的，前端根据grade_id再查接口
   * @returns
   */
  async findOneByUserName(
    user_name: string,
    pageNo = config.page.pageNumber,
    pageSize = config.page.pageSize,
  ) {
    try {
      const gradeByUserName = await this.grade.findAndCount({
        where: {
          user_name: Like('%' + user_name + '%'),
        },
        select: [
          'grade_id',
          'user_name',
          'user_id',
          'status',
          'bask_info_score',
          'debt_pay_score',
          'credit_score',
          'all_score',
          'create_time',
          'update_time',
          'grade',
          'old_grade',
        ], // 分页
        skip: (pageNo - 1) * pageSize,
        take: pageSize,
      });

      return gradeByUserName[0];
    } catch (error) {
      console.log(error);
      throw new HttpException(
        error.message ?? '该用户不存在',
        error.status ?? 404,
      );
    }
  }
}
