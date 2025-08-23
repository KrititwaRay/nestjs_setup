import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config'; // It’s a built-in service that lets you easily access environment variables (process.env) and configuration values throughout your NestJS application.

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const env = process.env.NODE_ENV || 'development';

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const logger = app.get(Logger);



  console.log("logger ", logger);

  await app.listen(configService.getOrThrow('PORT'), () => {
    logger.debug(
      `[${configService.get('PROJECT_NAME')} | ${configService.get('NODE_ENV')}] is running: http://127.0.0.1:${configService.get('PORT')}/apidoc/v1`
    );
  });
}
bootstrap();
