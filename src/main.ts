import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import ENV from '../env.json';
import { GlobalException } from './Exception/GlobalException';


async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  // CORS設定
  app.enableCors({
    origin: [`${ENV.CORS.PROTOCOL}${ENV.CORS.DOMAIN}${ENV.CORS.PORT}`],
  });

  // エラーハンドリング
  app.useGlobalFilters(new GlobalException());

  await app.listen(ENV.PORT);
}
bootstrap();
