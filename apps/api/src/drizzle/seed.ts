import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UsersService } from '../users/users.service';

async function seed() {
  const app = await NestFactory.create(AppModule);
  const usersService = app.get(UsersService);

  try {
    // Créer un utilisateur de test
    await usersService.create('test@test.com', 'password123', 'Test User');
    console.log('Seed complete');
  } catch (error) {
    console.error('Seed error:', error);
  } finally {
    await app.close();
  }
}

seed();
