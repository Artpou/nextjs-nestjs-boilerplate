/* eslint-disable no-console */
// @/seed/main.ts
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app.module';
import { DRIZZLE } from './core/database/drizzle/drizzle.module';
import type { DrizzleDB } from './core/database/drizzle/types/drizzle';
import { CompanyService } from './modules/company/company.service';
import { UserService } from './modules/user/user.service';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { logger: false },
  );

  const db = app.get<DrizzleDB>(DRIZZLE);
  const userService = app.get(UserService);
  const companyService = app.get(CompanyService);

  try {
    await db.transaction(async (tx) => {
      console.log('🌱 Creating companies...');

      const company = await companyService.create(
        {
          name: 'Company 1',
          description: 'Description 1',
          website: 'https://www.company1.com',
          email: 'company1@example.com',
          phone: '1234567890',
          address: '123 Main St, Anytown, USA',
        },
        tx,
      );

      if (!company) throw new Error('❌ Failed to create companies');

      console.log('🌱 Creating users...');

      const user = await userService.create(
        {
          email: 'user1@example.com',
          password: 'password1',
          companyId: company.id,
        },
        tx,
      );

      if (!user) throw new Error('❌ Failed to create users');

      console.log('✅ Seed completed successfully');
    });
  } catch (error) {
    console.error('❌ Seed failed:', error);
  } finally {
    await app.close();
    process.exit(0);
  }
}

bootstrap();
