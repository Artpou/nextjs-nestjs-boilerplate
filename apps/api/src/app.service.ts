import { Injectable, Inject } from '@nestjs/common';
import { DrizzleAsyncProvider } from './drizzle/drizzle.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

@Injectable()
export class AppService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private readonly db: NodePgDatabase,
  ) {}

  async status() {
    // db status
    // return this.db.query.users.findMany();
  }
}
