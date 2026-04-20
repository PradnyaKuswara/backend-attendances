import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { UpdateUserDto } from '@app/common/dto/update-user.dto';
import { UpdateUserStatusDto } from '@app/common/dto/update-user-status.dto';
import { CreateUserDto } from '@app/common/dto/create-user.dto';
import { FindUserByEmailDto } from '@app/common/dto/find-user-by-email.dto';
import { successResponse } from '@app/common';

@Controller()
export class UsersMessageController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: 'create_user' })
  async create(@Payload() payload: CreateUserDto) {
    const res = await this.usersService.create(payload);

    return successResponse({
      status: 201,
      data: res,
      message: 'User created successfully',
    });
  }

  @MessagePattern({ cmd: 'find_all_users' })
  async findAll() {
    const res = await this.usersService.findAll();

    return successResponse({
      data: res,
      message: 'Users fetched successfully',
    });
  }

  @MessagePattern({ cmd: 'find_user_by_id' })
  async findById(@Payload('id') id: number) {
    const res = await this.usersService.findById(id);

    return successResponse({
      data: res,
      message: 'User fetched successfully',
    });
  }

  @MessagePattern({ cmd: 'find_user_by_email' })
  async findByEmail(@Payload() payload: FindUserByEmailDto) {
    const res = await this.usersService.findByEmail(payload.email);

    return successResponse({
      data: res,
      message: 'User fetched successfully',
    });
  }

  @MessagePattern({ cmd: 'find_user_by_ids' })
  async findByIds(@Payload('ids') ids: number[]) {
    const res = await this.usersService.findByIds(ids);

    return successResponse({
      data: res,
      message: 'Users fetched successfully',
    });
  }

  @MessagePattern({ cmd: 'update_user' })
  async update(@Payload() payload: { id: number; data: UpdateUserDto }) {
    const res = await this.usersService.update(payload.id, payload.data);

    return successResponse({
      data: res,
      message: 'User updated successfully',
    });
  }

  @MessagePattern({ cmd: 'update_user_status' })
  async updateStatus(
    @Payload() payload: { id: number; data: UpdateUserStatusDto },
  ) {
    const res = await this.usersService.updateStatus(payload.id, payload.data);

    return successResponse({
      data: res,
      message: 'User status updated successfully',
    });
  }

  @MessagePattern({ cmd: 'delete_user' })
  async softDelete(@Payload('id') id: number) {
    const res = await this.usersService.softDelete(id);

    return successResponse({
      data: res,
      message: 'User deleted successfully',
    });
  }
}
