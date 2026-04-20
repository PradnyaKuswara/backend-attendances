import { AttendanceInterface } from '../interface/attendance.interface';
import { UserInterface } from '../interface/user.interface';

export class DashboardStatsDto {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  totalAttendances: number;
  presentToday: number;
  lateToday: number;
  absentToday: number;
}

export class DashboardDataDto {
  stats: DashboardStatsDto;
  recentUsers: UserInterface[];
  recentAttendances: AttendanceInterface[];
}

export class DashboardResponseDto {
  statusCode: number;
  message: string;
  data: DashboardDataDto;
}
