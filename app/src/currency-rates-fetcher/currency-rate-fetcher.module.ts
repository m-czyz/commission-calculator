import { HttpModule } from '@nestjs/axios';
import { CacheModule, Module } from '@nestjs/common';

import { CurrencyRatesFetcherService } from './currency-rates-fetcher.service';

@Module({
  imports: [HttpModule, CacheModule.register()],
  providers: [CurrencyRatesFetcherService],
  exports: [CurrencyRatesFetcherService],
})
export class CurrencyRateFetcherModule {}
