import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ApiModule } from './api.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);

  const options = new DocumentBuilder()
      .setTitle('API')
      .setDescription('API criada para o desafio técnico da AVMB')
      .setVersion('1.0')
      .addServer('http://localhost:3000/', 'Local')
      .build()

  const document = SwaggerModule.createDocument(app, options)
  
  SwaggerModule.setup('docs', app, document)

  await app.listen(3000);
}

bootstrap();
