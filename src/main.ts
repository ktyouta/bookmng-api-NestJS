import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import ENV from '../env.json';
import { GlobalException } from './exception/GlobalException';
import { AccessInterceptor } from './interceptor/access.interceptor';
import { AppDataSource } from './datasource';


async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  await AppDataSource.initialize();

  // CORS設定
  app.enableCors({
    origin: [`${ENV.CORS.PROTOCOL}${ENV.CORS.DOMAIN}${ENV.CORS.PORT}`],
  });

  const cookieParser = require("cookie-parser");
  app.use(cookieParser());

  // エンドポイントアクセス時処理
  app.useGlobalInterceptors(app.get(AccessInterceptor));

  // エラーハンドリング
  app.useGlobalFilters(new GlobalException());

  await app.listen(ENV.PORT);
}
bootstrap();
