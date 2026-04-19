import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AttendanceService } from './attendances.service';
import { CreateAttendanceDto } from '@app/common/dto/create-attendance.dto';
import { successResponse } from '@app/common';

@Controller()
export class AttendanceMessageController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @MessagePattern({ cmd: 'create_attendance' })
  async create(@Payload() payload: CreateAttendanceDto) {
    const res = await this.attendanceService.create(payload);

    return successResponse({
      message: 'Attendance created successfully',
      status: 201,
      data: {
        attendance: res,
      },
    });
  }

  @MessagePattern({ cmd: 'find_all_attendances' })
  async findAll() {
    const res = await this.attendanceService.findAll();

    return successResponse({
      message: 'Attendances fetched successfully',
      status: 200,
      data: {
        attendances: res,
      },
    });
  }

  @MessagePattern({ cmd: 'find_attendances_by_user' })
  async findByUser(@Payload() userId: number) {
    const res = await this.attendanceService.findByUser(userId);

    return successResponse({
      message: 'Attendances fetched successfully',
      status: 200,
      data: {
        attendances: res,
      },
    });
  }

  @MessagePattern({ cmd: 'check_out_attendance' })
  async checkOut(@Payload() userId: number) {
    const res = await this.attendanceService.checkOut(userId);

    return successResponse({
      message: 'Attendance checked out successfully',
      status: 200,
      data: {
        attendance: res,
      },
    });
  }
}
