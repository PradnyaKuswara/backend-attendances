import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from './entities/attendances.entity';
import { AttendanceService } from './attendances.service';
import { AttendanceMessageController } from './attendances-message.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([Attendance]),
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.USER_SERVICE_HOST || '127.0.0.1',
          port: Number(process.env.USER_SERVICE_PORT) || 4002,
        },
      },
    ]),
  ],
  controllers: [AttendanceMessageController],
  providers: [AttendanceService],
})
export class AttendanceModule {}
