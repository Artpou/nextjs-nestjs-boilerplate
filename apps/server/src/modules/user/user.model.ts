import { relations } from 'drizzle-orm';
import { pgTable, varchar, text, uuid } from 'drizzle-orm/pg-core';

import {
  entityFields,
  Entity,
  EntityResponse,
} from '@/core/shared/model/entity.model';

import { companies } from '../company/company.model';

export const users = pgTable('users', {
  ...entityFields,
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: text('password'),
  name: varchar('name', { length: 255 }),
  companyId: uuid('company_id').references(() => companies.id),
});

export const userRelations = relations(users, ({ one }) => ({
  company: one(companies, {
    fields: [users.companyId],
    references: [companies.id],
  }),
}));

export class UserEntity extends Entity<typeof users> {
  constructor() {
    super(users);
  }
}

export type User = EntityResponse<UserEntity>;
