import { Injectable, Inject } from '@nestjs/common';
import { DrizzleAsyncProvider } from '../drizzle/drizzle.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import { users } from 'db/schema';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private readonly db: NodePgDatabase,
  ) {}

  async findByEmail(email: string) {
    return await this.db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)
      .then((rows) => rows?.[0]);
  }

  async create(email: string, password: string, name: string) {
    return this.db.insert(users).values({
      email: email,
      password: password,
    });
  }

  async validatePassword(user: any, password: string) {
    return user.password === password;
  }
}
