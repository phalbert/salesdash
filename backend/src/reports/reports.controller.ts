import { Body, Controller, Get, Post } from '@nestjs/common';
import { Report, Sale } from '@prisma/client';
import { ReportDto, ChunkDto } from './reports.dto';
import { ReportService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  async findAll(): Promise<Report[]> {
    return await this.reportService.getReports()
  }

  @Get('/sales')
  async findAllSales(): Promise<Sale[]> {
    return await this.reportService.getSales()
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
