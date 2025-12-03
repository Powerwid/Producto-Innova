import { NestFactory } from '@nestjs/core';
import { RolesSeeder } from './roles.seed';
import { SeedModule } from './seed.module';
import { UserSeeder } from './user.seed';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeedModule);

  const rolesSeeder = app.get(RolesSeeder);
  await rolesSeeder.run();

  const userSeeder = app.get(UserSeeder);
  await userSeeder.run();

  await app.close();
}

bootstrap();
