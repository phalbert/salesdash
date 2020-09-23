import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReportService {
  constructor(
    @InjectQueue('sales') private reportsQueue: Queue,
    private readonly prisma: PrismaService,
  ) {}

  async saveReportDetails(report) {
    return await this.prisma.report.create({ data: report });
  }

  async queueReportChunks(data) {
    await this.reportsQueue.add(data);
    console.log('chunk queued');
    return { msg: 'Report Chunk Queued' };
  }

  async getReports() {
    return await this.prisma.report.findMany({
      orderBy: [
        {
          id: 'desc',
        },
      ],
    });
  }

  async getSales(page: number = 0, count: number = 10) {
    return await this.prisma.sale.findMany({
      orderBy: {
        id: 'desc',
      },
      skip: page * count,
      take: count,
    });
  }
}
