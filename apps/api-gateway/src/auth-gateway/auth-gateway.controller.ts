import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGatewayService } from './auth-gateway.service';
import { LoginDto } from '@app/common/dto/login.dto';
import { JwtAuthGuard } from 'apps/api-gateway/guard/jwt.guard';

@Controller('auth')
export class AuthGatewayController {
  constructor(private readonly authGatewayService: AuthGatewayService) {}

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authGatewayService.login(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('user-info')
  userInfo(@Req() req: { user: { sub: number } }) {
    return this.authGatewayService.userInfo(req.user.sub);
  }
}
