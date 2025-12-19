import { Module } from '@nestjs/common';
import { RolesSeeder } from './roles.seed';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSeeder } from './user.seed';
import { PaymentMethodSeeder } from './payment-method.seed';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: false,
      }),
    }),
  ],
  providers: [RolesSeeder, UserSeeder, PaymentMethodSeeder],
  exports: [RolesSeeder, UserSeeder, PaymentMethodSeeder],
})
export class SeedModule { }
