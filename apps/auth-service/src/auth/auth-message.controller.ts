import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { LoginDto } from '@app/common/dto/login.dto';
import { LoginResponseDto } from '@app/common/interface/login-response.interface';
import { successResponse } from '@app/common';

@Controller()
export class AuthMessageController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'auth_login' })
  async login(@Payload() payload: LoginDto): Promise<LoginResponseDto> {
    const res = await this.authService.login(payload);
    return successResponse({
      data: res,
      message: 'Login success',
    });
  }

  @MessagePattern({ cmd: 'auth_user_info' })
  async userInfo(@Payload() user_id: number) {
    const res = await this.authService.userInfo(user_id);
    return successResponse({
      data: res,
      message: 'User info fetched successfully',
    });
  }
}
