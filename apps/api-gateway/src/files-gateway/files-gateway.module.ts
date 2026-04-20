import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import 'dotenv/config';
import { FilesGatewayController } from './files-gateway.controller';
import { FilesGatewayService } from './files-gateway.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'FILE_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.FILE_SERVICE_HOST || '127.0.0.1',
          port: Number(process.env.FILE_SERVICE_PORT) || 4004,
        },
      },
    ]),
  ],
  controllers: [FilesGatewayController],
  providers: [FilesGatewayService],
})
export class FilesGatewayModule {}
