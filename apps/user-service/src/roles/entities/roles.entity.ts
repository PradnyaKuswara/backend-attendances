// src/modules/roles/entities/role.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/users.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ unique: true, type: 'varchar' })
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
