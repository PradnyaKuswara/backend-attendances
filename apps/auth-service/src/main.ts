import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.AUTH_SERVICE_HOST || '127.0.0.1',
        port: parseInt(process.env.AUTH_SERVICE_PORT || '4001', 10),
      },
    },
  );

  await app.listen();
  console.log('Auth Service running on TCP 4001');
}
void bootstrap();
