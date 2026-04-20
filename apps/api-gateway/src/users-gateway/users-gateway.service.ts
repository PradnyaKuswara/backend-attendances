import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateUserDto } from '@app/common/dto/create-user.dto';
import { UpdateUserDto } from '@app/common/dto/update-user.dto';
import { UpdateUserStatusDto } from '@app/common/dto/update-user-status.dto';

@Injectable()
export class UsersGatewayService {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
  ) {}

  create(dto: CreateUserDto) {
    return firstValueFrom(this.userClient.send({ cmd: 'create_user' }, dto));
  }

  findAll() {
    return firstValueFrom(this.userClient.send({ cmd: 'find_all_users' }, {}));
  }

  findById(id: number) {
    return firstValueFrom(
      this.userClient.send({ cmd: 'find_user_by_id' }, { id }),
    );
  }

  update(id: number, dto: UpdateUserDto) {
    return firstValueFrom(
      this.userClient.send({ cmd: 'update_user' }, { id, data: dto }),
    );
  }

  updateStatus(id: number, dto: UpdateUserStatusDto) {
    return firstValueFrom(
      this.userClient.send({ cmd: 'update_user_status' }, { id, data: dto }),
    );
  }

  delete(id: number) {
    return firstValueFrom(this.userClient.send({ cmd: 'delete_user' }, { id }));
  }

  findAllRoles() {
    console.log('[Gateway Service] -> Find all roles request received');
    return firstValueFrom(this.userClient.send({ cmd: 'find_all_roles' }, {}));
  }
}
