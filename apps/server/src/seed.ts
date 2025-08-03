/** biome-ignore-all lint/suspicious/noConsole: need seed logs */
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
      console.log('🌱 Seeding companies...');

      let company = await companyService.findByEmail('company1@example.com');

      if (company) {
        console.log('✓ Company already exists, using existing one');
      } else {
        company = await companyService.create(
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
        console.log('✓ Created new company');
      }

      if (!company) throw new Error('❌ Failed to get or create company');

      console.log('🌱 Seeding users...');

      const existingUser = await userService.findByEmail('user1@example.com');

      if (existingUser) {
        console.log('✓ User already exists, skipping creation');
      } else {
        const user = await userService.create(
          {
            email: 'user1@example.com',
            password: 'password1',
            companyId: company.id,
          },
          tx,
        );

        if (!user) throw new Error('❌ Failed to create user');
        console.log('✓ Created new user');
      }

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
