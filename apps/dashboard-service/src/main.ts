import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.DASHBOARD_SERVICE_HOST || '127.0.0.1',
        port: parseInt(process.env.DASHBOARD_SERVICE_PORT || '4005', 10),
      },
    },
  );
  await app.listen();
  console.log('Dashboard Service running on TCP 4005');
}
void bootstrap();
