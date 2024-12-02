import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastifyCookie from '@fastify/cookie';
import fastifyCors from '@fastify/cors';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  await app.register(fastifyCors, {
    origin: ['http://localhost:3001', 'http://localhost:3000'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  await app.register(fastifyCookie, {
    secret: process.env.AUTH_SECRET,
  });

  const PORT = 5002;
  await app.listen(PORT, '0.0.0.0');

  const logger = new Logger('EntryPoint');
  logger.log(`Server running on http://localhost:${PORT}`);
}

bootstrap();
