import { Test, TestingModule } from '@nestjs/testing';

import { TransactionProcessorController } from './transaction-processor.controller';

describe('CommissionCalculatorController', () => {
  let controller: TransactionProcessorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionProcessorController],
    }).compile();

    controller = module.get<TransactionProcessorController>(TransactionProcessorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
