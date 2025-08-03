import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { eq } from 'drizzle-orm';
import { Tx } from '../../core/database/drizzle/drizzle.module';
import { EntityInsert } from '../../core/shared/model/entity.model';

import { EntityService } from '@/core/shared/service/entity.service';

import { User, UserEntity } from './user.model';
@Injectable()
export class UserService extends EntityService<UserEntity> {
  protected entity = new UserEntity();

  async findWithPassword(email: string): Promise<User | undefined> {
    return await this.db.query.users.findFirst({
      where: eq(this.table.email, email),
    });
  }

  async findById(id: string): Promise<User | undefined> {
    return await this.db.query.users.findFirst({
      where: eq(this.table.id, id),
    });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.db.query.users.findFirst({
      where: eq(this.table.email, email),
    });
  }

  async create(insert: EntityInsert<UserEntity>, tx?: Tx): Promise<User> {
    const password = await hash(insert.password ?? '', 10);

    const [user] = await (tx ?? this.db)
      .insert(this.table)
      .values({ ...insert, password })
      .returning();

    if (!user) throw new Error('User not created');

    return user;
  }
}
