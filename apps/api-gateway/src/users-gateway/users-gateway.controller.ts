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
import { UsersGatewayService } from './users-gateway.service';

@Controller('admin/users')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.SUPER_ADMIN)
export class UsersGatewayController {
  constructor(private readonly usersGatewayService: UsersGatewayService) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    console.log('[Gateway Controller] -> Create user request received');
    return this.usersGatewayService.create(dto);
  }

  @Get()
  findAll() {
    console.log('[Gateway Controller] -> Find all users request received');
    return this.usersGatewayService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    console.log('[Gateway Controller] -> Find user by id request received');
    return this.usersGatewayService.findById(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto) {
    console.log('[Gateway Controller] -> Update user request received');
    return this.usersGatewayService.update(id, dto);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserStatusDto,
  ) {
    console.log('[Gateway Controller] -> Update user status request received');
    return this.usersGatewayService.updateStatus(id, dto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    console.log('[Gateway Controller] -> Delete user request received');
    return this.usersGatewayService.delete(id);
  }
}
