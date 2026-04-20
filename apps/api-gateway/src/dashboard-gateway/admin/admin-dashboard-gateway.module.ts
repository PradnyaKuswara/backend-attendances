import { AdminDashboardGatewayController } from './admin-dashboard-gateway.controller';
import { Module } from '@nestjs/common';
import { AuthModule as LibAuthModule } from '@app/auth';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AdminDashboardGatewayService } from './admin-dashboard-gateway.service';

@Module({
  imports: [
    LibAuthModule,
    ClientsModule.register([
      {
        name: 'DASHBOARD_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.DASHBOARD_SERVICE_HOST || '127.0.0.1',
          port: Number(process.env.DASHBOARD_SERVICE_PORT) || 4005,
        },
      },
    ]),
  ],
  controllers: [AdminDashboardGatewayController],
  providers: [AdminDashboardGatewayService],
})
export class AdminDashboardGatewayModule {}
