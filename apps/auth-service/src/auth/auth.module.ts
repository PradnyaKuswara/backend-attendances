import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import 'dotenv/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthMessageController } from './auth-message.controller';
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
          port: Number(process.env.USER_SERVICE_PORT) || 4002,
        },
      },
    ]),
  ],
  controllers: [AuthController, AuthMessageController],
  providers: [AuthService],
})
export class AuthModule {}
