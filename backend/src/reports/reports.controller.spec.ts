import { Test, TestingModule } from '@nestjs/testing';
import { ReportsController } from './reports.controller';
import { ReportService } from './reports.service';

describe('ReportsController', () => {
  let controller: ReportsController;
  let service: ReportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportsController],
    }).compile();

    controller = module.get<ReportsController>(ReportsController);
  });

  describe('findAll', () => {
    it('should return an array of sales', async () => {
      const result = ['test'];
      // jest.spyOn(service, 'findAllSales').mockImplementation(() => result);

      expect(await service.getSales).toBe(result);
    });
  });
});
