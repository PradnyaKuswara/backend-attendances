import { Module } from '@nestjs/common';
import { AuthGatewayModule } from './auth-gateway/auth-gateway.module';
import { UsersGatewayModule } from './users-gateway/users-gateway.module';
import { AttendancesGatewayModule } from './attendances-gateway/attendances-gateway.module';
import { FilesGatewayModule } from './files-gateway/files-gateway.module';

@Module({
  imports: [
    AuthGatewayModule,
    UsersGatewayModule,
    AttendancesGatewayModule,
    FilesGatewayModule,
  ],
})
export class AppModule {}
