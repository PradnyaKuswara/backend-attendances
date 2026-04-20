import { DashboardResponseDto } from '@app/common/dto/dashboard-response.dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AdminDashboardGatewayService {
  constructor(
    @Inject('DASHBOARD_SERVICE') private readonly dashboardClient: ClientProxy,
  ) {}

  async getDashboard() {
    const res: DashboardResponseDto = await firstValueFrom(
      this.dashboardClient.send({ cmd: 'admin_dashboard' }, {}),
    );

    return res;
  }
}
