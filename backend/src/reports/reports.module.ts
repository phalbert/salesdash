import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ReportsController } from './reports.controller';
import { ReportService } from './reports.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReportsProcessor } from './reports.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'sales',
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: Number(process.env.REDIS_PORT) || 6379,
        password: process.env.REDIS_PASSWORD
      },
    }),
  ],
  controllers: [ReportsController],
  providers: [ReportService, PrismaService, ReportsProcessor]
})
export class ReportsModule {}
