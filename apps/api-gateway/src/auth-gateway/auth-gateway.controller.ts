import { Body, Controller, Post } from '@nestjs/common';
import { AuthGatewayService } from './auth-gateway.service';
import { LoginDto } from '@app/common/dto/login.dto';

@Controller('auth')
export class AuthGatewayController {
  constructor(private readonly authGatewayService: AuthGatewayService) {}

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authGatewayService.login(dto);
  }
}
