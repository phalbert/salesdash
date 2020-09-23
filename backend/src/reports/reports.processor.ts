import { Processor, Process } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { PrismaService } from '../prisma/prisma.service';
import { ChunkDto } from './reports.dto';

@Processor('sales')
export class ReportsProcessor {
  private readonly logger = new Logger(ReportsProcessor.name);
  constructor(private readonly prisma: PrismaService) {}

  @Process()
  async store(job) {
    console.log('new chunk', job.data);
    const records = await this.getSalesRecordsFromChunk(job.data.chunkString);
    const createMany = records.map(record =>
      this.prisma.sale.create({
        data: record,
      }),
    );
    await Promise.all(createMany);
    return { msg: 'Chunk Created' };
  }

  async getSalesRecordsFromChunk(chunkString) {
    let sales = [];
    chunkString.split('\n').forEach((line: string) => {
      const item = line.split(',');
      if (!isNaN(Number(item[6]))) {
        const data = {
          region: item[0],
          country: item[1],
          itemType: item[2],
          salesChannel: item[3],
          orderPriority: item[4],
          orderDate: new Date(item[5]),
          orderId: Number(item[6]),
          shipDate: new Date(item[7]),
          units: Number(item[8]),
          unitPrice: Number(item[9]),
          unitCost: Number(item[10]),
          total: Number(item[11]),
        };
        sales.push(data);
      }
    });
    return sales;
  }
}
