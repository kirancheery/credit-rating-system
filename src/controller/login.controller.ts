import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { LoginService } from '../service/login.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto, RegisterDto } from '../dto/login.dto';
@ApiTags('登录注册')
@Controller('auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @ApiOperation({ description: '所有人员的登录' })
  @Post('/login')
  @HttpCode(200)
  async login(@Body() LoginDto: LoginDto) {
    return await this.loginService.login(LoginDto);
  }
  @ApiOperation({ description: '普通用户注册' })
  @Post('/register')
  @HttpCode(200)
  async register(@Body() registerDto: RegisterDto) {
    return await this.loginService.register(registerDto);
  }
}
