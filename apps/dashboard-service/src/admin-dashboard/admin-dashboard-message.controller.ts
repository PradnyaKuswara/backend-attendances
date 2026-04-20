import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AdminDashboardService } from './admin-dashboard.service';
import { successResponse } from '@app/common';

@Controller()
export class AdminDashboardMessageController {
  constructor(private readonly adminDashboardService: AdminDashboardService) {}

  @MessagePattern({ cmd: 'admin_dashboard' })
  async getDashboard() {
    const res = await this.adminDashboardService.findDashboard();

    return successResponse({
      data: res,
      message: 'Dashboard fetched successfully',
    });
  }
}
