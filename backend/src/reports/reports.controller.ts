import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Report, Sale } from '@prisma/client';
import { ReportDto, ChunkDto } from './reports.dto';
import { ReportService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  async findAll(): Promise<Report[]> {
    return await this.reportService.getReports();
  }

  @Get('/sales')
  async findAllSales(@Query() query): Promise<unknown> {
    console.log(query);
    return await this.reportService.getSales(query.page, query.count);
  }

  @Get('/salesByDate')
  async findSaleStats(@Query() query): Promise<unknown> {
    return await this.reportService.getSaleStats(query.fromDate, query.toDate);
  }

  @Post()
  async createReport(@Body() report: ReportDto) {
    return await this.reportService.saveReportDetails(report);
  }

  @Post('/sales')
  async createSales(@Body() chunkDto: ChunkDto) {
    return await this.reportService.queueReportChunks(chunkDto);
  }
}
