import { Module } from '@nestjs/common';

import { CommissionCalculatorModule } from '../commission-calculator/commission-calculator.module';
import { CurrencyExchangeModule } from '../currency-exchange/currency-exchange.module';
import { TransactionPersistenceModule } from '../transaction-persistance/transaction-persistence.module';
import { TransactionProcessorController } from './transaction-processor.controller';
import { TransactionProcessorService } from './transaction-processor.service';

@Module({
  imports: [CommissionCalculatorModule, CurrencyExchangeModule, TransactionPersistenceModule],
  controllers: [TransactionProcessorController],
  providers: [TransactionProcessorService],
})
export class TransactionProcessorModule {}
