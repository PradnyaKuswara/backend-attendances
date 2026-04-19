import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.ATTENDANCE_SERVICE_HOST || '127.0.0.1',
        port: parseInt(process.env.ATTENDANCE_SERVICE_PORT || '4003', 10),
      },
    },
  );

  await app.listen();
  console.log('Attendance Service running on TCP 4003');
}
void bootstrap();
