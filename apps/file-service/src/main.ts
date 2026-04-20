import { NestFactory } from '@nestjs/core';
import { FileServiceModule } from './file-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    FileServiceModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.FILE_SERVICE_HOST || '127.0.0.1',
        port: parseInt(process.env.FILE_SERVICE_PORT || '4004', 10),
      },
    },
  );
  await app.listen();
  console.log('File Service running on TCP 4004');
}
bootstrap();
