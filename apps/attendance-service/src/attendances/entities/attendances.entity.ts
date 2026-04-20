import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';

export enum AttendanceStatus {
  PRESENT = 'present',
  LATE = 'late',
  ABSENT = 'absent',
}

@Entity('attendances')
@Unique(['user_id', 'date'])
export class Attendance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  user_id: number;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'timestamp', nullable: true })
  check_in_at: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  check_out_at: Date | null;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  check_in_latitude: number | null;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  check_in_longitude: number | null;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  check_out_latitude: number | null;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  check_out_longitude: number | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  photo_url: string | null;

  @Column({
    type: 'enum',
    enum: AttendanceStatus,
    default: AttendanceStatus.PRESENT,
  })
  status: AttendanceStatus;

  @Column({ type: 'varchar', length: 255, nullable: true })
  notes: string | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date | null;
}
