import { ResponseInterface } from './response.interface';
import { UserWithoutPasswordType } from './user.interface';

export enum AttendanceStatus {
  PRESENT = 'present',
  LATE = 'late',
  ABSENT = 'absent',
}

export interface AttendanceInterface {
  id: number;
  user_id: number;
  date: string;
  check_in_at: Date | null;
  check_out_at: Date | null;
  check_in_latitude: number | null;
  check_in_longitude: number | null;
  check_out_latitude: number | null;
  check_out_longitude: number | null;
  photo_url: string | null;
  status: AttendanceStatus;
  notes: string | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  user: UserWithoutPasswordType | null;
}

export type AttendanceResponseDataType = ResponseInterface<AttendanceInterface>;
