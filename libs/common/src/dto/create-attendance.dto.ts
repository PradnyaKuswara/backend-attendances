import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAttendanceDto {
  @IsInt()
  user_id: number;

  @IsOptional()
  @IsString()
  photo_url?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsNumber()
  check_in_latitude?: number;

  @IsOptional()
  @IsNumber()
  check_in_longitude?: number;
}
