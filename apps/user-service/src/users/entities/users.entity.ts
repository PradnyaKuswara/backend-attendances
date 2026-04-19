import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Role } from '../../roles/entities/roles.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'uuid', unique: true })
  uuid: string;

  @Column({ name: 'role_id', type: 'int', unsigned: true })
  role_id: number;

  @Column({ unique: true, type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ name: 'full_name', nullable: true, type: 'varchar', length: 255 })
  full_name?: string;

  @Column({ name: 'position', nullable: true, type: 'varchar', length: 255 })
  position?: string;

  @Column({ nullable: true, type: 'varchar', length: 30 })
  phone?: string;

  @Column({ nullable: true, type: 'text' })
  avatar?: string;

  @Column({ name: 'is_active', default: true, type: 'boolean' })
  is_active: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @BeforeInsert()
  generateUuid() {
    this.uuid = uuidv4();
  }
}
