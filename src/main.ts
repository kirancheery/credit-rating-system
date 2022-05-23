import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExFilter } from './exception/exception.filter';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import config from './config';
import { AuthGuard } from './auth/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 全局错误处理中间件
  app.useGlobalFilters(new ExFilter());
  // 全局路由前缀
  app.setGlobalPrefix(config.globalPrefix);
  // 跨域
  app.enableCors();
  // 全局登录验证
  app.useGlobalGuards(new AuthGuard());
  // swagger
  const options = new DocumentBuilder()
    .setTitle('API文档  ')
    .setDescription('The API description')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }) // 认证
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document);
  Logger.log(`swaggerURL : http://localhost:${config.port}/doc`);

  await app.listen(config.port);
}
bootstrap();
