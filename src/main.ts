import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';
import * as cors from 'cors';
config();

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.useGlobalPipes(new ValidationPipe);
//   const config = new DocumentBuilder()
//     .setTitle('Documentation  API Obiris')
//     .setDescription('Liste des methodes  de l\'API d\'Obiris')
//     .setVersion('1.0')
//     .addBearerAuth({ type: 'http', scheme: 'bearer' }, 'JWT')
//     .build();
//   const document = SwaggerModule.createDocument(app, config);
//   SwaggerModule.setup('api', app, document);
//   await app.listen(3000);
// }

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ['debug', 'error', 'log', 'warn'] });
  app.useGlobalPipes(new ValidationPipe());
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Documentation API Obiris')
    .setDescription('Liste des méthodes de l\'API d\'Obiris')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer' }, 'JWT')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, swaggerDocument);
  app.use(cors());
  await app.listen(3000);
}

bootstrap();
