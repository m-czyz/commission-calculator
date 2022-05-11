import { Module } from '@nestjs/common';

import { ClientTurnoverModule } from '../client-turnover/client-turnover.module';
import { CommissionCalculatorService } from './commission-calculator.service';

@Module({
  imports: [ClientTurnoverModule],
  providers: [CommissionCalculatorService],
  exports: [CommissionCalculatorService],
})
export class CommissionCalculatorModule {}
