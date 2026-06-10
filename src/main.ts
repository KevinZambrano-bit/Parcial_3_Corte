import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Práctica Backend API')
    .setDescription('API REST — NestJS, JWT, MySQL y despliegue con Docker')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  // TODO (estudiante): Habilita CORS si un cliente externo consume esta API.

  const port = Number(configService.get<string>('PORT')) || 3000;
  await app.listen(port, '0.0.0.0');
  console.log(`Server is running on port ${port}`);
  console.log(`Swagger docs: http://localhost:${port}/api`);
}

bootstrap();
