import { Module } from '@nestjs/common';
import { RolesSeeder } from './roles.seed';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSeeder } from './user.seed';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'powerwid',
      database: 'tienda_innova',
      autoLoadEntities: true,
      synchronize: false,
    }),
  ],
  providers: [RolesSeeder, UserSeeder],
  exports: [RolesSeeder, UserSeeder],
})
export class SeedModule {}
