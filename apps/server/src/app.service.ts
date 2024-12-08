import type { DrizzleDB } from './drizzle/types/drizzle';

import { Injectable, Inject } from '@nestjs/common';

import { DRIZZLE } from './drizzle/drizzle.module';
@Injectable()
export class AppService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  getHello(): string {
    return 'Hello World!';
  }

  async status() {
    // db status
    // return this.db.query.users.findMany();
  }
}
