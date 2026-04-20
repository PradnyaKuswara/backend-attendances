import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AttendancesGatewayService } from '../attendances-gateway.service';
import { CreateAttendanceDto } from '@app/common/dto/create-attendance.dto';
import { JwtAuthGuard } from 'apps/api-gateway/guard/jwt.guard';
import { Roles } from 'apps/api-gateway/decorator/role.decorator';
import { Role } from '@app/common/enums/role.enum';

@Controller('/users/attendances')
@UseGuards(JwtAuthGuard)
@Roles(Role.USER)
export class AttendancesUserGatewayController {
  constructor(
    private readonly attendancesGatewayService: AttendancesGatewayService,
  ) {}

  @Get()
  async findByUser(@Req() req: { user: { sub: number } }) {
    return this.attendancesGatewayService.findByUser(req.user.sub);
  }

  @Get('last')
  async findLastByUser(@Req() req: { user: { sub: number } }) {
    return this.attendancesGatewayService.findLastByUser(req.user.sub);
  }

  @Post('check-in')
  async create(@Body() dto: CreateAttendanceDto) {
    return this.attendancesGatewayService.create(dto);
  }

  @Post('check-out')
  async checkOut(@Req() req: { user: { sub: number } }) {
    return this.attendancesGatewayService.checkOut(req.user.sub);
  }
}
