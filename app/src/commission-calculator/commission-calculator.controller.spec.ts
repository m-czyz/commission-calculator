import { Test, TestingModule } from '@nestjs/testing';
import { CommissionCalculatorController } from './commission-calculator.controller';

describe('CommissionCalculatorController', () => {
  let controller: CommissionCalculatorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommissionCalculatorController],
    }).compile();

    controller = module.get<CommissionCalculatorController>(CommissionCalculatorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
