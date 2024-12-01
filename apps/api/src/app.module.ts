import { MiddlewareConsumer, Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { LoggerMiddleware } from './logger/logger.middleware';
import * as winston from 'winston';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.colorize(),
            winston.format.printf(({ level, message, stack }) => {
              return `${level}: ${message}${stack ? `\n${stack}` : ''}`;
            }),
          ),
        }),
      ],
    }),
  ],
  controllers: [AppController],
  providers: [LoggerMiddleware, AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
