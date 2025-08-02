import { relations } from 'drizzle-orm';
import { pgTable, varchar, text } from 'drizzle-orm/pg-core';

import {
  Entity,
  entityFields,
  EntityResponse,
} from '../../core/shared/model/entity.model';
import { users } from '../user/user.model';

export const companies = pgTable('companies', {
  ...entityFields,
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  website: varchar('website', { length: 255 }),
  email: varchar('email', { length: 255 }),
  phone: varchar('phone', { length: 50 }),
  address: text('address'),
});

export const companyRelations = relations(companies, ({ many }) => ({
  users: many(users),
}));

export class CompanyEntity extends Entity<typeof companies> {
  constructor() {
    super(companies);
  }
}

export type Company = EntityResponse<CompanyEntity>;
