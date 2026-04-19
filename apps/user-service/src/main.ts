import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.USER_SERVICE_HOST || '127.0.0.1',
        port: parseInt(process.env.USER_SERVICE_PORT || '4002', 10),
      },
    },
  );
  await app.listen();
  console.log('User Service running on TCP 4002');
}
void bootstrap();
