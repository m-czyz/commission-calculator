import { Module } from '@nestjs/common';

import { ClientTurnoverModule } from '../client-turnover/client-turnover.module';
import { CurrencyExchangeModule } from '../currency-exchange/currency-exchange.module';
import { TransactionPersistenceModule } from '../transaction-persistance/transaction-persistence.module';
import { CommissionCalculatorController } from './commission-calculator.controller';
import { CommissionCalculatorService } from './commission-calculator.service';

@Module({
  imports: [CurrencyExchangeModule, TransactionPersistenceModule, ClientTurnoverModule],
  controllers: [CommissionCalculatorController],
  providers: [CommissionCalculatorService],
})
export class CommissionCalculatorModule {}
