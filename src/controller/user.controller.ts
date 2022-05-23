import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from '../service/user.service';
import { CreateUserDto, DeleteUserDto } from '../dto/userDto';
import { Roles } from 'src/decorator/roles.decorator';

@ApiTags('人员管理')
@Controller('user')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   *  只创建管理员 只有超管可以操作
   * @param createUserDto
   * @returns
   */
  @ApiOperation({ description: '创建管理员' })
  @Post()
  @Roles('super')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  /**
   *  查找所有用户
   *  admin super 可以操作
   * @returns
   */
  @ApiOperation({ description: '查找所有用户' })
  @Get('/find/user')
  @Roles('admin', 'super')
  async findAllUser(
    // 带有问号参数的请求方式,
    // ? 可选
    @Query('pageNo') pageNo?: string,
    @Query('pageSize') pageSize?: string,
  ) {
    return await this.userService.findAll(parseInt(pageNo), parseInt(pageSize));
  }

  /**
   *  查找所有管理员或者人员
   *  admin super 可以操作
   * @returns
   */
  @ApiOperation({ description: '查找所有管理员' })
  @Get('/find/manager')
  @Roles('super')
  async findAllManager(
    // 带有问号参数的请求方式,
    // ? 可选
    @Query('pageNo') pageNo?: string,
    @Query('pageSize') pageSize?: string,
  ) {
    return await this.userService.findAll(
      parseInt(pageNo),
      parseInt(pageSize),
      false,
    );
  }

  /**
   * 根据ID查找一个用户
   * @param user_id
   * @returns
   */
  @ApiOperation({ description: '根据ID查找一个用户' })
  @Get('/findOne/:user_id')
  async findOne(@Param('user_id') user_id: string) {
    return await this.userService.findOne(+user_id);
  }

  /**
   * 删除用户:设置del-flag为2
   * 根据user_id 删除用户
   * @param user_id
   * @returns
   */
  @ApiOperation({ description: '根据id删除一个用户' })
  @Post('/delete')
  @Roles('admin', 'super')
  async remove(@Body() body: DeleteUserDto) {
    return await this.userService.remove(body.user_id);
  }
}
