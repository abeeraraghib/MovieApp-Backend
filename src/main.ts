import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { MoviesModule } from './movies/movies.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  // Enable CORS for your Netlify frontend
  app.enableCors({
    origin: [process.env.FRONTEND_URL],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));

  // Swagger setup (optional)
  const builder = new DocumentBuilder()
    .setTitle('Backend APIs')
    .setDescription('This API suite serves the mobile clients.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, builder, {
    include: [MoviesModule],
  });

  SwaggerModule.setup('docs', app, document);

  const PORT = parseInt(process.env.PORT || '5000', 10);
  await app.listen(PORT, '0.0.0.0', () => {
    Logger.log(`🚀 Server running on port ${PORT}`);
  });
}

bootstrap();
