import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './entities/users.entity';
import { UsersMessageController } from './users-message.controller';
import { UsersController } from './users.controller';
import { Role } from '../roles/entities/roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  controllers: [UsersController, UsersMessageController],
  providers: [UsersService],
})
export class UsersModule {}
