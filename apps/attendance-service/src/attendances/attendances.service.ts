import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { Repository } from 'typeorm';
import { Attendance, AttendanceStatus } from './entities/attendances.entity';
import { CreateAttendanceDto } from '@app/common/dto/create-attendance.dto';
import { UserWithoutPasswordResponseDataType } from '@app/common/interface/user.interface';
import { rpcBadRequest, rpcForbidden, rpcNotFound } from '@app/common';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepository: Repository<Attendance>,

    @Inject('USER_SERVICE')
    private readonly userClient: ClientProxy,
  ) {}

  async create(dto: CreateAttendanceDto) {
    const response =
      await firstValueFrom<UserWithoutPasswordResponseDataType | null>(
        this.userClient.send({ cmd: 'find_user_by_id' }, dto.user_id),
      );

    if (!response || !response.data) {
      throw rpcNotFound('User not found');
    }

    const user = response.data;

    if (user.is_active !== true) {
      throw rpcForbidden('User is not active');
    }

    const now = new Date();
    const today = now.toISOString().split('T')[0];

    const existingAttendance = await this.attendanceRepository.findOne({
      where: {
        user_id: user.id,
        date: today,
      },
    });

    if (existingAttendance) {
      throw rpcBadRequest('You have already checked in today');
    }

    const lateThreshold = new Date(now);
    lateThreshold.setHours(8, 0, 0, 0);

    const status =
      now > lateThreshold ? AttendanceStatus.LATE : AttendanceStatus.PRESENT;

    const attendance = this.attendanceRepository.create({
      user_id: user.id,
      date: today,
      check_in: now,
      photo_url: dto.photo_url ?? null,
      notes: dto.notes ?? null,
      status,
    });

    return this.attendanceRepository.save(attendance);
  }

  async findAll() {
    return this.attendanceRepository.find({
      order: {
        created_at: 'DESC',
      },
    });
  }

  async findByUser(userId: number) {
    return this.attendanceRepository.find({
      where: { user_id: userId },
      order: {
        date: 'DESC',
      },
    });
  }

  async checkOut(userId: number) {
    const today = new Date().toISOString().split('T')[0];

    const attendance = await this.attendanceRepository.findOne({
      where: {
        user_id: userId,
        date: today,
      },
    });

    if (!attendance) {
      throw rpcNotFound('Attendance for today not found');
    }

    if (attendance.check_out) {
      throw rpcBadRequest('You have already checked out today');
    }

    attendance.check_out = new Date();

    return this.attendanceRepository.save(attendance);
  }
}
