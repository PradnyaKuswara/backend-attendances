import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/roles.entity';
import { RolesService } from './roles.service';
import { RolesMessageController } from './roles-message.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [RolesMessageController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
