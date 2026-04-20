import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  AttendanceInterface,
  AttendanceResponseDataType,
} from '@app/common/interface/attendance.interface';
import {
  UserInterface,
  UserResponseDataType,
} from '@app/common/interface/user.interface';
import { DashboardDataDto } from '@app/common/dto/dashboard-response.dto';
@Injectable()
export class AdminDashboardService {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
    @Inject('ATTENDANCE_SERVICE')
    private readonly attendanceClient: ClientProxy,
  ) {}

  async findDashboard(): Promise<DashboardDataDto> {
    const [usersResponse, attendancesResponse] = await Promise.all([
      firstValueFrom(
        this.userClient.send<UserResponseDataType>(
          { cmd: 'find_all_users' },
          {},
        ),
      ),
      firstValueFrom(
        this.attendanceClient.send<AttendanceResponseDataType>(
          { cmd: 'find_all_attendances' },
          {},
        ),
      ),
    ]);

    const users: UserInterface[] =
      usersResponse?.data && Array.isArray(usersResponse.data)
        ? usersResponse.data
        : [];

    const attendances: AttendanceInterface[] =
      attendancesResponse?.data && Array.isArray(attendancesResponse.data)
        ? attendancesResponse.data
        : [];

    const totalUsers = users.length;
    const activeUsers = users.filter((user) => user.is_active).length;
    const inactiveUsers = users.filter((user) => !user.is_active).length;
    const totalAttendances = attendances.length;

    const today = this.formatDateOnly(new Date());

    const todayAttendances = attendances.filter((attendance) => {
      const sourceDate = attendance.date ?? attendance.created_at;
      if (!sourceDate) return false;

      return this.formatDateOnly(sourceDate) === today;
    });

    const presentToday = todayAttendances.filter(
      (item) => this.normalizeAttendanceStatus(item.status) === 'present',
    ).length;

    const lateToday = todayAttendances.filter(
      (item) => this.normalizeAttendanceStatus(item.status) === 'late',
    ).length;

    const absentToday = todayAttendances.filter(
      (item) => this.normalizeAttendanceStatus(item.status) === 'absent',
    ).length;

    const recentUsers = [...users]
      .sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      })
      .slice(0, 5);

    const recentAttendances = [...attendances]
      .sort((a, b) => {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      })
      .slice(0, 5);

    return {
      stats: {
        totalUsers,
        activeUsers,
        inactiveUsers,
        totalAttendances,
        presentToday,
        lateToday,
        absentToday,
      },
      recentUsers,
      recentAttendances,
    };
  }

  private normalizeAttendanceStatus(
    status?: string,
  ): 'present' | 'late' | 'absent' | 'other' {
    if (!status) return 'other';

    const lower = status.toLowerCase();

    if (lower.includes('present') || lower.includes('hadir')) {
      return 'present';
    }

    if (lower.includes('late') || lower.includes('terlambat')) {
      return 'late';
    }

    if (
      lower.includes('absent') ||
      lower.includes('alpha') ||
      lower.includes('tidak hadir')
    ) {
      return 'absent';
    }

    return 'other';
  }

  private formatDateOnly(value: string | Date): string {
    const date = new Date(value);

    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Jakarta',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    return formatter.format(date); // format: YYYY-MM-DD
  }
}
