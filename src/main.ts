import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config'; // It’s a built-in service that lets you easily access environment variables (process.env) and configuration values throughout your NestJS application.

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import compression from 'compression';
import { AppModule } from './app.module';

async function bootstrap() {
  const env = process.env.NODE_ENV || 'development';


  console.info(
    '\x1b[36m%s\x1b[0m',
    '🚀 Bootstrap:',
    `Starting application in [${env.toUpperCase()}] mode`,
  );

  console.info('\x1b[32m%s\x1b[0m', '🔧 Node Version:', process.version);

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const logger = app.get(Logger);


  app.enableCors({
    origin: '*',
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    credentials: true, // allow cookies, authorization headers, or TLS client certificates.
  });
  app.use(compression());
  if (configService.getOrThrow('NODE_ENV') === 'development') {
    const createConfig = (title: string, description: string) => {
      return new DocumentBuilder()
        .setOpenAPIVersion('3.1.0')
        .setTitle(title)
        .setDescription(description)
        .setVersion('1.0')
        .addServer(configService.get('BACKEND_URL')!)
        .build()
    }


    const configApi = createConfig(
      `${configService.get('PROJECT_NAME')} Frontend application API`,
      `The User API. <br><br> API endpoints for Admin panel API. <br> <a  href="/apidoc/v1"> Admin panel API-Doc </a> <br><br> 📥 OpenAPI JSON (Postman): <code>${configService.get('BACKEND_URL')}apidoc/v1/user/openapi.json</code>`,
    );


    const documentApi = SwaggerModule.createDocument(app, configApi);



    SwaggerModule.setup(
      'apidoc/v1',
      app,
      {
        ...documentApi,

      },
      {
        swaggerOptions: {
          defaultModelsExpandDepth: -1, // Hides the Schemas section
        },
        jsonDocumentUrl: 'apidoc/v1/user/openapi.json',
      }
    )
  }






  await app.listen(configService.getOrThrow('PORT'), () => {
    logger.debug(
      `[${configService.get('PROJECT_NAME')} | ${configService.get('NODE_ENV')}] is running: http://127.0.0.1:${configService.get('PORT')}/apidoc/v1`
    );
  });
}
bootstrap();
