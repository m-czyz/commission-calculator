import { Module } from '@nestjs/common';

import { CurrencyRateFetcherModule } from '../currency-rates-fetcher/currency-rate-fetcher.module';
import { CurrencyExchangeService } from './currency-exchange.service';

@Module({
  imports: [CurrencyRateFetcherModule],
  providers: [CurrencyExchangeService],
  exports: [CurrencyExchangeService],
})
export class CurrencyExchangeModule {}
