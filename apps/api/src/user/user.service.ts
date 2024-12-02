import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'dto';
import { hash } from 'bcrypt';
import * as schema from 'src/drizzle/schema';
import { eq } from 'drizzle-orm';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDB } from 'src/drizzle/types/drizzle';

@Injectable()
export class UserService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async create(dto: CreateUserDto) {
    const user = await this.db.query.users.findFirst({
      where: eq(schema.users.email, dto.email),
    });

    if (user) throw new ConflictException('email duplicated');

    await this.db.insert(schema.users).values({
      ...dto,
      password: await hash(dto.password, 10),
    });

    const { password, ...result } = user;
    return result;
  }

  async findByEmail(email: string) {
    return await this.db.query.users.findFirst({
      where: eq(schema.users.email, email),
    });
  }
  async findById(id: number) {
    return await this.db.query.users.findFirst({
      where: eq(schema.users.id, id),
    });
  }
}
