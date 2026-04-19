import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateAttendanceDto {
  @IsInt()
  user_id: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  photo_url?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  notes?: string;
}
