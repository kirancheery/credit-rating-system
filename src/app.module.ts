import { Module, ValidationPipe } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ResponseInterceptor } from './interceptor/response.interceptor';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GradeController } from './controller/grade.controller';
import { GradeService } from './service/grade.service';

import config from './config';
import { GradeEntity } from './entity/grade.entity';
import { UserEntity } from './entity/user.entity';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { LoginService } from './service/login.service';
import { LoginController } from './controller/login.controller';
import { RolesGuard } from './auth/roles.guard';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...config.typeOrm,
      }),
    }),

    TypeOrmModule.forFeature([GradeEntity]),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [GradeController, UserController, LoginController],
  providers: [
    GradeService,
    UserService,
    LoginService,

    // 统一相应数据拦截
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    // 验证
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    // roles角色守卫
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
