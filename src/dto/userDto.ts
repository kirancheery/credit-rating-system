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
 * 此DTO只为管理员
 */
export class CreateUserDto {
  @ApiProperty({ example: 'admin' })
  @MaxLength(30, { message: '账户不能超过30个字符' })
  @IsNotEmpty({ message: '账户不能为空' })
  readonly user_name: string;

  @ApiProperty({ example: 2 })
  @IsNumber()
  @IsIn([2, 3], { message: '类型只能时2.3中的一个' })
  readonly user_type: number;

  @ApiProperty({ example: '123@qq.com' })
  @MaxLength(50, { message: '邮箱不能超过50个字符' })
  @IsNotEmpty({ message: '邮箱不能为空' })
  @Matches(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/, {
    message: '请输入正确的邮箱账户',
  })
  readonly email: string;

  @ApiProperty({ example: '18312341234' })
  @MaxLength(11, { message: '电话不能超过11个字符' })
  @IsNotEmpty({ message: '电话不能为空' })
  @Matches(
    /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
    {
      message: '请输入正确的手机号',
    },
  )
  readonly phonenumber: string;

  @ApiProperty({ example: '12345678qwe' })
  @MaxLength(16, { message: '密码不能超过16个字符' })
  @MinLength(8, { message: '密码不能少于8位' })
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;
}

export class DeleteUserDto {
  @ApiProperty({ example: '2' })
  @IsNumber({}, { message: 'user_id需要时数字' })
  @IsNotEmpty({ message: 'user_id不能为空' })
  user_id: number;
}
