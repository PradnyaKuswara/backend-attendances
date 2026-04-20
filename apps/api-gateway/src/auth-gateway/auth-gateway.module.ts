import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import 'dotenv/config';
import { AuthGatewayController } from './auth-gateway.controller';
import { AuthGatewayService } from './auth-gateway.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.AUTH_SERVICE_HOST || '127.0.0.1',
          port: Number(process.env.AUTH_SERVICE_PORT) || 3001,
        },
      },
    ]),
  ],
  controllers: [AuthGatewayController],
  providers: [AuthGatewayService],
})
export class AuthGatewayModule {}
