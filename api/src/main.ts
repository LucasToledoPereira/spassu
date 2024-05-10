/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { swagger } from './application/swagger/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ResponseTransformInterceptor } from './infra/interceptors/response-transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
  });
  app.useBodyParser('text');

  //Add /api prefix to all paths/routes
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  // Add class-validator pipe for all requests
  app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }));

  // Add transform response interceptor for every request/controller
  app.useGlobalInterceptors(new ResponseTransformInterceptor());

  // Add swagger documentation
  swagger(app);

  // Allow CORS for all
  app.enableCors();

  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
