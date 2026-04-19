import { Body, Controller, Post, UseGuards } from '@nestjs/common';
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

  @Post()
  async create(@Body() dto: CreateAttendanceDto) {
    return this.attendancesGatewayService.create(dto);
  }
}
