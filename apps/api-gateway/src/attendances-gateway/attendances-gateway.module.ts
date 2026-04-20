import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import 'dotenv/config';
import { AuthModule as LibAuthModule } from '@app/auth';
import { AttendancesGatewayService } from './attendances-gateway.service';
import { AttendancesUserGatewayController } from './users/attendances-user-gateway.controller';
import { AttendancesAdminGatewayController } from './admin/attendances-admin-gateway.controller';

@Module({
  imports: [
    LibAuthModule,
    ClientsModule.register([
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
  controllers: [
    AttendancesUserGatewayController,
    AttendancesAdminGatewayController,
  ],
  providers: [AttendancesGatewayService],
})
export class AttendancesGatewayModule {}
