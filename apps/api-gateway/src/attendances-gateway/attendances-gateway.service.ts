import { CreateAttendanceDto } from '@app/common/dto/create-attendance.dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AttendancesGatewayService {
  constructor(
    @Inject('ATTENDANCE_SERVICE')
    private readonly attendanceClient: ClientProxy,
  ) {}

  create(dto: CreateAttendanceDto) {
    return firstValueFrom<unknown>(
      this.attendanceClient.send({ cmd: 'create_attendance' }, dto),
    );
  }

  findAll() {
    return firstValueFrom<unknown>(
      this.attendanceClient.send({ cmd: 'find_all_attendances' }, {}),
    );
  }

  findByUser(userId: number) {
    return firstValueFrom<unknown>(
      this.attendanceClient.send({ cmd: 'find_attendances_by_user' }, userId),
    );
  }

  findLastByUser(userId: number) {
    return firstValueFrom<unknown>(
      this.attendanceClient.send(
        { cmd: 'find_last_attendance_by_user' },
        userId,
      ),
    );
  }

  checkOut(userId: number) {
    return firstValueFrom<unknown>(
      this.attendanceClient.send({ cmd: 'check_out_attendance' }, userId),
    );
  }
}
