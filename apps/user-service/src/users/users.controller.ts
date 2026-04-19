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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '@app/common/dto/create-user.dto';
import { UpdateUserDto } from '@app/common/dto/update-user.dto';
import { UpdateUserStatusDto } from '@app/common/dto/update-user-status.dto';
import { successResponse } from '@app/common';

@Controller('users')
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }),
)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() payload: CreateUserDto) {
    const res = await this.usersService.create(payload);

    return successResponse({
      data: res,
      message: 'User created successfully',
    });
  }

  @Get()
  async findAll() {
    const res = await this.usersService.findAll();

    return successResponse({
      data: res,
      message: 'Users fetched successfully',
    });
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const res = await this.usersService.findById(id);

    return successResponse({
      data: res,
      message: 'User fetched successfully',
    });
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto,
  ) {
    const res = await this.usersService.update(id, payload);

    return successResponse({
      data: res,
      message: 'User updated successfully',
    });
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserStatusDto,
  ) {
    const res = await this.usersService.updateStatus(id, payload);

    return successResponse({
      data: res,
      message: 'User status updated successfully',
    });
  }

  @Delete(':id')
  async softDelete(@Param('id', ParseIntPipe) id: number) {
    await this.usersService.softDelete(id);

    return successResponse({
      message: 'User deleted successfully',
      data: null,
    });
  }
}
