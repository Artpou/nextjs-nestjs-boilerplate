import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: FastifyRequest['raw'], res: FastifyReply['raw'], next: () => void) {
    res.on('finish', () => {
      try {
        const { method, url } = req;
        const { statusCode } = res;
        const message = `${statusCode} ${method} ${url}`;

        statusCode >= 400
          ? this.logger.error(message)
          : this.logger.log(message);
      } catch (error) {
        this.logger.error('Error in LoggerMiddleware:', error);
      }
    });
    next();
  }
}
