import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import ENV from '../env.json';
import { GlobalException } from './exception/GlobalException';
import { AccessInterceptor } from './interceptor/AccessInterceptor';


async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  // CORS設定
  app.enableCors({
    origin: [`${ENV.CORS.PROTOCOL}${ENV.CORS.DOMAIN}${ENV.CORS.PORT}`],
  });

  // エンドポイントアクセス時処理
  app.useGlobalInterceptors(app.get(AccessInterceptor));

  // エラーハンドリング
  app.useGlobalFilters(new GlobalException());

  await app.listen(ENV.PORT);
}
bootstrap();
