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

  async getSales(page: string, count: number = 10) {
    let pageNo = Number(page || 0);
    // not the best way but anyway
    pageNo = pageNo === 0 ? pageNo : pageNo - 1;

    const total = await this.prisma.sale.count();
    const results = await this.prisma.sale.findMany({
      orderBy: {
        id: 'desc',
      },
      skip: pageNo * Number(count),
      take: Number(count),
    });
    return { total, results };
  }
}
