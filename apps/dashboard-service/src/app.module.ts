import { Module } from '@nestjs/common';
import { AdminDashboardModule } from './admin-dashboard/admin-dashboard.module';

@Module({
  imports: [AdminDashboardModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
