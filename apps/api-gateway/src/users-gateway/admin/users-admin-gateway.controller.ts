import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'apps/api-gateway/guard/jwt.guard';
import { RolesGuard } from 'apps/api-gateway/guard/role.guard';
import { Roles } from 'apps/api-gateway/decorator/role.decorator';
import { Role } from '@app/common/enums/role.enum';
import { CreateUserDto } from '@app/common/dto/create-user.dto';
import { UpdateUserDto } from '@app/common/dto/update-user.dto';
import { UpdateUserStatusDto } from '@app/common/dto/update-user-status.dto';
import { UsersGatewayService } from '../users-gateway.service';

@Controller('admin/users')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.SUPER_ADMIN)
export class UsersAdminGatewayController {
  constructor(private readonly usersGatewayService: UsersGatewayService) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersGatewayService.create(dto);
  }

  @Get()
  findAll() {
    return this.usersGatewayService.findAll();
  }

  @Get('roles')
  findAllRoles() {
    return this.usersGatewayService.findAllRoles();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.usersGatewayService.findById(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto) {
    return this.usersGatewayService.update(id, dto);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserStatusDto,
  ) {
    return this.usersGatewayService.updateStatus(id, dto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersGatewayService.delete(id);
  }
}
