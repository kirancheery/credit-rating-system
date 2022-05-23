import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { GradeService } from '../service/grade.service';
import { Roles } from '../decorator/roles.decorator';

import {
  CreateGradeDto,
  UpdateGradeDTO,
  DeleteByGradeIdDto,
} from '../dto/gradeDto';
@ApiTags('评级管理')
@Controller('grade')
@ApiBearerAuth()
export class GradeController {
  constructor(private readonly gradeService: GradeService) {}

  /**
   *  注意特殊的一个： user_id
   * @param createGradeDto
   * @returns
   */

  @ApiOperation({ description: '创建用户评分' })
  @Post()
  @HttpCode(200)
  async create(@Body() createGradeDto: CreateGradeDto) {
    return await this.gradeService.insert(createGradeDto);
  }

  /**
   *  查看所有评分
   * 限制角色： super admin
   * @returns
   */
  @ApiOperation({ description: '所有评分列表' })
  @Get('/list')
  @Roles('super', 'admin')
  async findAll(
    // 带有问号参数的请求方式,
    // ? 可选
    @Query('pageNo') pageNo?: string,
    @Query('pageSize') pageSize?: string,
  ) {
    return await this.gradeService.findAll(
      parseInt(pageNo),
      parseInt(pageSize),
    );
  }

  /**
   *  如果用户可以提交多个审核，那么这个API则存在，否则删除下面的代码 这里是用户自己登录查看自己的，所以是根据用户主键
   * @param user_id
   * @returns
   */
  @ApiOperation({ description: '根据用户主键查看评分' })
  @Get('/:user_id')
  @Roles('user')
  async findOne(@Param('user_id') user_id: string) {
    return await this.gradeService.findOneByUserId(parseInt(user_id));
  }

  /**
   *  根据用户名称查看评分
   * @param user_name
   * @param pageNo
   * @param pageSize
   * @returns
   */
  @ApiOperation({ description: '根据用户名称查看评分' })
  @Get('/find/name')
  @Roles('admin', 'super')
  async findOneByUserName(
    @Query('user_name') user_name: string, // 带有问号参数的请求方式,
    // ? 可选
    @Query('pageNo') pageNo?: string,
    @Query('pageSize') pageSize?: string,
  ) {
    // 一个参数的限制，就不单独写DTO了
    if (typeof user_name != 'string' || user_name.length > 50) {
      throw new HttpException('user_name不能超过50个字符串', 400);
    }
    return await this.gradeService.findOneByUserName(
      user_name.trim(),
      parseInt(pageNo),
      parseInt(pageSize),
    );
  }

  /**
   * 更新审核状态
   * 限制角色:super
   * @param updateGradeDTO
   * @returns
   */
  @ApiOperation({ description: '更新审核状态' })
  @Post('/update')
  @HttpCode(200)
  @Roles('super')
  async updateStatusByUserId(@Body() updateGradeDTO: UpdateGradeDTO) {
    return await this.gradeService.update(updateGradeDTO);
  }

  @ApiOperation({ description: '根据评分主键删除该评分' })
  @Roles('super')
  @Post('/delete')
  @HttpCode(200)
  async deleteById(@Body() deleteByGradeIdDto: DeleteByGradeIdDto) {
    return await this.gradeService.remove(deleteByGradeIdDto);
  }
}
