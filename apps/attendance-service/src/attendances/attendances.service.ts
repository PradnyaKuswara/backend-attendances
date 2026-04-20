import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { Repository } from 'typeorm';
import { Attendance, AttendanceStatus } from './entities/attendances.entity';
import { CreateAttendanceDto } from '@app/common/dto/create-attendance.dto';
import {
  UserWithoutPasswordResponseDataType,
  UserWithoutPasswordType,
} from '@app/common/interface/user.interface';
import { rpcBadRequest, rpcForbidden, rpcNotFound } from '@app/common';
import { AttendanceInterface } from '@app/common/interface/attendance.interface';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepository: Repository<Attendance>,

    @Inject('USER_SERVICE')
    private readonly userClient: ClientProxy,
  ) {}

  async create(dto: CreateAttendanceDto): Promise<Attendance> {
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
      check_in_at: now,
      check_in_latitude: dto.check_in_latitude ?? null,
      check_in_longitude: dto.check_in_longitude ?? null,
      check_out_latitude: null,
      check_out_longitude: null,
      photo_url: dto.photo_url ?? null,
      notes: dto.notes ?? null,
      status,
    });

    return this.attendanceRepository.save(attendance);
  }

  async findAll(): Promise<AttendanceInterface[]> {
    const attendances = await this.attendanceRepository.find({
      order: {
        created_at: 'DESC',
      },
    });

    const userIds = [...new Set(attendances.map((item) => item.user_id))];

    const users: UserWithoutPasswordType[] = await firstValueFrom(
      this.userClient.send<UserWithoutPasswordType[]>(
        { cmd: 'find_user_by_ids' },
        userIds,
      ),
    );

    const userMap = new Map<number, UserWithoutPasswordType>(
      users.map((user) => [user.id, user]),
    );

    return attendances.map((attendance) => ({
      ...attendance,
      user: userMap.get(attendance.user_id) ?? null,
    }));
  }

  async findByUser(userId: number): Promise<Attendance[]> {
    return this.attendanceRepository.find({
      where: { user_id: userId },
      order: {
        date: 'DESC',
      },
    });
  }

  async findLastByUser(userId: number): Promise<Attendance | null> {
    return this.attendanceRepository.findOne({
      where: { user_id: userId },
      order: {
        date: 'DESC',
      },
    });
  }

  async checkOut(
    userId: number,
    checkOutLatitude?: number,
    checkOutLongitude?: number,
  ): Promise<Attendance> {
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

    if (attendance.check_out_at) {
      throw rpcBadRequest('You have already checked out today');
    }

    attendance.check_out_at = new Date();
    attendance.check_out_latitude = checkOutLatitude ?? null;
    attendance.check_out_longitude = checkOutLongitude ?? null;

    return this.attendanceRepository.save(attendance);
  }
}
