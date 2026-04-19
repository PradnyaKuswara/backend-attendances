import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/users.entity';
import { Role } from './roles/entities/roles.entity';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
      entities: [User, Role],
    }),
    UsersModule,
    RolesModule,
  ],
})
export class AppModule {}
