import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Inject, Injectable } from '@nestjs/common';
import { LoginUserData } from '@app/common/interface/login-response.interface';
import { LoginDto } from '@app/common/dto/login.dto';
import { rpcForbidden, rpcUnauthorized } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { UserResponseDataType } from '@app/common/interface/user.interface';
import { JwtPayloadInterface } from '@app/common/interface/jwt.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
    private readonly jwtService: JwtService,
  ) {}

  async login(payload: LoginDto): Promise<LoginUserData> {
    const { data: user } = await firstValueFrom(
      this.userClient.send<UserResponseDataType>(
        { cmd: 'find_user_by_email' },
        { email: payload.email },
      ),
    );

    if (!user) {
      throw rpcUnauthorized('Wrong email or password');
    }

    const isActive = Boolean(user.is_active);

    if (!isActive) {
      throw rpcForbidden('Your account is inactive');
    }

    const isPasswordValid: boolean = await bcrypt.compare(
      payload.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw rpcUnauthorized('Wrong email or password');
    }

    const jwtPayload: JwtPayloadInterface = {
      sub: user.id,
      uuid: user.uuid,
      email: user.email,
      role_id: user.role_id,
      role: user.role?.name ?? null,
    };

    const accessToken = await this.jwtService.signAsync(jwtPayload);

    return {
      access_token: accessToken,
    };
  }
}
