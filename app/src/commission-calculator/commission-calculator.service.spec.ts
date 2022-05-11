import { Test, TestingModule } from '@nestjs/testing';

import { CommissionCalculatorService } from './commission-calculator.service';

describe('CommissionCalculatorService', () => {
  let service: CommissionCalculatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommissionCalculatorService],
    }).compile();

    service = module.get<CommissionCalculatorService>(CommissionCalculatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
