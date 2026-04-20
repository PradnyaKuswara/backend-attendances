import { Controller, Get, UseGuards } from '@nestjs/common';
import { AttendancesGatewayService } from '../attendances-gateway.service';
import { JwtAuthGuard } from 'apps/api-gateway/guard/jwt.guard';
import { Roles } from 'apps/api-gateway/decorator/role.decorator';
import { Role } from '@app/common/enums/role.enum';
import { RolesGuard } from 'apps/api-gateway/guard/role.guard';

@Controller('/admin/attendances')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.SUPER_ADMIN, Role.ADMIN)
export class AttendancesAdminGatewayController {
  constructor(
    private readonly attendancesGatewayService: AttendancesGatewayService,
  ) {}

  @Get()
  async findAll() {
    return this.attendancesGatewayService.findAll();
  }
}
