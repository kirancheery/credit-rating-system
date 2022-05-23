import { ApiProperty } from '@nestjs/swagger';
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

/**
 * 所有用户
 */
export class LoginDto {
  @ApiProperty({ example: '18312341234' })
  @IsString({ message: '电话号码需要是字符串' })
  @MaxLength(11, { message: '电话号码不能超过11个字符' })
  @IsNotEmpty({ message: '电话号码不能为空' })
  @Matches(/^(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/, {
    message: '电话号码格式不正确',
  })
  readonly phonenumber: string;

  @ApiProperty({ example: '123456!@#' })
  @IsString({ message: '密码需要是字符串' })
  @MaxLength(16, { message: '密码不能超过16个字符' })
  @MinLength(8, { message: '密码不能少于8位' })
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;

  @ApiProperty({ example: 3 })
  @IsNumber()
  @IsIn([1, 2, 3], { message: '类型只能时1.2.3中的一个' })
  readonly user_type: number;
}

/**
 *  注册仅提供用户注册，管理员需要后台直接添加
 */
export class RegisterDto extends LoginDto {
  @ApiProperty({ example: '1234@qq.com' })
  @IsString({ message: '邮箱需要是字符串' })
  @MaxLength(50, { message: '邮箱不能超过50个字符' })
  @IsNotEmpty({ message: '邮箱不能为空' })
  @Matches(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/, {
    message: '邮箱格式不正确',
  })
  readonly email: string;

  @ApiProperty({ example: '名称' })
  @IsString({ message: '用户名称需要是字符串' })
  @MaxLength(50, { message: '用户名称不能超过50个字符' })
  @IsNotEmpty({ message: '用户名称不能为空' })
  readonly user_name: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsIn([1], { message: '注册类型只能是1' })
  readonly user_type: number;
}
