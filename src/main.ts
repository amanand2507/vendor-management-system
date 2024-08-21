import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Vendor Management System')
    .setDescription('API for managing vendors and purchase orders')
    .setVersion('1.0')
    .addTag('vendors')
    .addTag('purchase-orders')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);
  await app.listen(process.env.PORT);
}
bootstrap();
