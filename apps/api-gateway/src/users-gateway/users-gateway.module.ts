import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersGatewayController } from './users-gateway.controller';
import { UsersGatewayService } from './users-gateway.service';
import 'dotenv/config';
import { AuthModule as LibAuthModule } from '@app/auth';

@Module({
  imports: [
    LibAuthModule,
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.USER_SERVICE_HOST || '127.0.0.1',
          port: Number(process.env.USER_SERVICE_PORT) || 3002,
        },
      },
    ]),
  ],
  controllers: [UsersGatewayController],
  providers: [UsersGatewayService],
})
export class UsersGatewayModule {}
