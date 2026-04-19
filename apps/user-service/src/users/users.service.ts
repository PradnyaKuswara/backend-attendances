import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './entities/users.entity';
import { Role } from '../roles/entities/roles.entity';
import { CreateUserDto } from '@app/common/dto/create-user.dto';
import { UpdateUserDto } from '@app/common/dto/update-user.dto';
import { UpdateUserStatusDto } from '@app/common/dto/update-user-status.dto';
import { rpcConflict, rpcNotFound } from '@app/common';
import { UserWithoutPasswordType } from '@app/common/interface/user.interface';
import { omitPassword } from '@app/common/helpers/helper.helper';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(payload: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { email: payload.email },
      withDeleted: false,
    });

    if (existingUser) {
      throw rpcConflict('Email already exists');
    }

    const role = await this.roleRepository.findOne({
      where: { id: payload.role_id },
    });

    if (!role) {
      throw rpcNotFound('Role not found');
    }

    const hashedPassword = await bcrypt.hash(payload.password, 10);

    const user = this.userRepository.create({
      role_id: payload.role_id,
      email: payload.email,
      password: hashedPassword,
      full_name: payload.full_name,
      position: payload.position,
      phone: payload.phone,
      avatar: payload.avatar,
      is_active: payload.is_active ?? true,
    });

    await this.userRepository.save(user);

    return this.findById(user.id) as Promise<User>;
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find({
      relations: ['role'],
      order: { id: 'DESC' },
    });

    return users.map(omitPassword);
  }

  async findById(id: number): Promise<UserWithoutPasswordType | null> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['role'],
    });

    return user ? omitPassword(user) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const users = await this.userRepository.findOne({
      where: { email },
      relations: ['role'],
    });

    return users;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['role'],
    });

    if (!user) {
      throw rpcNotFound('User not found');
    }

    return user;
  }

  async update(
    id: number,
    payload: UpdateUserDto,
  ): Promise<UserWithoutPasswordType | null> {
    const user = await this.findOne(id);

    if (payload.email && payload.email !== user.email) {
      const existingUser = await this.userRepository.findOne({
        where: { email: payload.email },
      });

      if (existingUser && existingUser.id !== id) {
        throw rpcConflict('Email already exists');
      }
    }

    if (payload.role_id !== undefined) {
      const role = await this.roleRepository.findOne({
        where: { id: payload.role_id },
      });

      if (!role) {
        throw rpcNotFound('Role not found');
      }
      user.role = role;
    }

    if (payload.email !== undefined) {
      user.email = payload.email;
    }

    if (payload.full_name !== undefined) {
      user.full_name = payload.full_name;
    }

    if (payload.position !== undefined) {
      user.position = payload.position;
    }

    if (payload.phone !== undefined) {
      user.phone = payload.phone;
    }

    if (payload.avatar !== undefined) {
      user.avatar = payload.avatar;
    }

    if (payload.password) {
      user.password = await bcrypt.hash(payload.password, 10);
    }

    await this.userRepository.save(user);

    return this.findById(user.id);
  }

  async updateStatus(
    id: number,
    payload: UpdateUserStatusDto,
  ): Promise<UserWithoutPasswordType | null> {
    const user = await this.findOne(id);

    user.is_active = payload.is_active;

    await this.userRepository.save(user);

    return this.findById(user.id);
  }

  async softDelete(id: number): Promise<void> {
    const user = await this.findOne(id);

    await this.userRepository.softRemove(user);
  }
}
