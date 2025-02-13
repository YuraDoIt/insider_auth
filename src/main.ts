import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ origin: true, credentials: true });

  const config = new DocumentBuilder()
    .setTitle('API Documentation')  // Заголовок документації
    .setDescription('The API description')  // Опис документації
    .setVersion('1.0')  // Версія API
    .addTag('events')  // Додавання тегів (можна для різних розділів API)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); 

  const Port = process.env.PORT ? + process.env.PORT : 3000;
  await app.listen(Port);
  console.log(`Start localhost ${Port}`);
}
bootstrap();
