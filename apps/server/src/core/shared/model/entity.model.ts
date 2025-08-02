import { InferSelectModel } from 'drizzle-orm';
import { PgColumn, PgTable, timestamp, uuid } from 'drizzle-orm/pg-core';
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from 'drizzle-zod';
import { createZodDto } from 'nestjs-zod';
import z from 'zod';

export const entityFields = {
  id: uuid('id').primaryKey().defaultRandom(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
};

type EntityTable = PgTable & {
  id: PgColumn;
  createdAt: PgColumn;
  updatedAt: PgColumn;
};

export type EntityResponse<E extends Entity<EntityTable>> = z.infer<
  E['schema']
>;

export type EntityInsert<E extends Entity<EntityTable>> = Omit<
  z.infer<E['insertSchema']>,
  'id' | 'createdAt' | 'updatedAt'
>;

export type EntityUpdate<E extends Entity<EntityTable>> = Omit<
  z.infer<E['updateSchema']>,
  'id' | 'createdAt' | 'updatedAt'
>;

export abstract class Entity<T extends EntityTable = EntityTable> {
  public readonly table: T;

  constructor(table: T) {
    this.table = table;
  }

  get schema() {
    return createSelectSchema(this.table) as unknown as z.ZodType<
      InferSelectModel<T>
    >;
  }

  get insertSchema() {
    return createInsertSchema(this.table);
  }

  get updateSchema() {
    return createUpdateSchema(this.table);
  }

  get selectDto() {
    return createZodDto(this.schema);
  }

  get insertDto() {
    return createZodDto(this.insertSchema);
  }

  get updateDto() {
    return createZodDto(this.updateSchema);
  }

  formatArray(data: EntityResponse<this>[]) {
    return this.schema.array().parse(data);
  }

  format(data: EntityResponse<this> | undefined) {
    return this.schema.parse(data);
  }
}
