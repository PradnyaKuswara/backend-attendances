import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AdminDashboardMessageController } from './admin-dashboard-message.controller';
import { AdminDashboardService } from './admin-dashboard.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.USER_SERVICE_HOST || '127.0.0.1',
          port: Number(process.env.USER_SERVICE_PORT) || 4002,
        },
      },
      {
        name: 'ATTENDANCE_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.ATTENDANCE_SERVICE_HOST || '127.0.0.1',
          port: Number(process.env.ATTENDANCE_SERVICE_PORT) || 4003,
        },
      },
    ]),
  ],
  controllers: [AdminDashboardMessageController],
  providers: [AdminDashboardService],
})
export class AdminDashboardModule {}
