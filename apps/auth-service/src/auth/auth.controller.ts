import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '@app/common/dto/login.dto';
import { LoginResponseDto } from '@app/common/interface/login-response.interface';
import { successResponse } from '@app/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() payload: LoginDto): Promise<LoginResponseDto> {
    const res = await this.authService.login(payload);

    return successResponse({
      data: res,
      message: 'Login success',
    });
  }
}
