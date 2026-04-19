import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { LoginResponseDto } from '@app/common/interface/login-response.interface';
import { LoginDto } from '@app/common/dto/login.dto';
import { handleRpcError } from 'apps/api-gateway/helpers/helper';

@Injectable()
export class AuthGatewayService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  async login(dto: LoginDto): Promise<LoginResponseDto> {
    try {
      return await firstValueFrom(
        this.authClient.send<LoginResponseDto, LoginDto>(
          { cmd: 'auth_login' },
          dto,
        ),
      );
    } catch (error: unknown) {
      handleRpcError(error);
    }
  }
}
