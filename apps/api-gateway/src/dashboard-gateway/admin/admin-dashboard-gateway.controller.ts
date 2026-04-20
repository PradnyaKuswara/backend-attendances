import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminDashboardGatewayService } from './admin-dashboard-gateway.service';
import { DashboardResponseDto } from '@app/common/dto/dashboard-response.dto';
import { JwtAuthGuard } from 'apps/api-gateway/guard/jwt.guard';
import { Roles } from 'apps/api-gateway/decorator/role.decorator';
import { Role } from '@app/common/enums/role.enum';
import { RolesGuard } from 'apps/api-gateway/guard/role.guard';

@Controller('admin/dashboard')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.SUPER_ADMIN, Role.ADMIN)
export class AdminDashboardGatewayController {
  constructor(
    private readonly adminDashboardGatewayService: AdminDashboardGatewayService,
  ) {}

  @Get()
  async getDashboard(): Promise<DashboardResponseDto> {
    return this.adminDashboardGatewayService.getDashboard();
  }
}
