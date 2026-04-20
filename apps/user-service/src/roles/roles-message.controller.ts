import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { RolesService } from './roles.service';
import { successResponse } from '@app/common';

@Controller()
export class RolesMessageController {
  constructor(private readonly rolesService: RolesService) {}

  @MessagePattern({ cmd: 'find_all_roles' })
  async findAll() {
    const res = await this.rolesService.findAll();

    console.log('roles', res);

    return successResponse({
      data: res,
      message: 'Roles fetched successfully',
    });
  }
}
