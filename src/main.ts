import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { urlencoded, json } from 'express';
import { MoviesModule } from './movies/movies.module';
 
 async function bootstrap() {
   const app = await NestFactory.create(AppModule);
 
   app.useGlobalPipes(new ValidationPipe());
   app.enableCors({
     origin: [
       'http://localhost:5173'
     ],
     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
     allowedHeaders: ['Content-Type', 'Authorization'],
     credentials: true,
   });
   app.use(json({ limit: '50mb' }));
   app.use(urlencoded({ extended: true, limit: '50mb' }));
 
   const builder = new DocumentBuilder()
     .setTitle('Backend APIs')
     .setDescription('This API suite serves the mobile clients.')
     .setVersion('1.0')
     .addBearerAuth(
       {
         type: 'http',
         scheme: 'bearer',
         bearerFormat: 'JWT',
         name: 'JWT',
         description:
           'Enter JWT token to authenticate the service provider user',
         in: 'header',
       },
      'JWT',
     )
     .build();
   const document = SwaggerModule.createDocument(app, builder, {
    include: [MoviesModule],
   }
  )
   SwaggerModule.setup('/', app, document);
 
   const PORT = 5000;
   await app.listen(PORT, () => {
     Logger.log('[BaseUrl/api] Swagger Documentation Url');
   });
 }
 
 bootstrap();