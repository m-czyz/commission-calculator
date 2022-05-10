import { Injectable } from '@nestjs/common';
import Big from 'big.js';
import { Dayjs } from 'dayjs';

import { CurrencyEnum } from '../commission-calculator/enum/currency.enum';
import { CurrencyRatesFetcherService } from '../currency-rates-fetcher/currency-rates-fetcher.service';
import { InvalidCurrencyExchangeException } from './exception/invalid-currency-exchange.exception';

@Injectable()
export class CurrencyExchangeService {
  public constructor(private readonly currencyRatesFetcherService: CurrencyRatesFetcherService) {}

  public async exchangeToEuro(baseAmount: Big, baseCurrency: CurrencyEnum, date: Dayjs): Promise<Big> {
    const dailyRates = await this.currencyRatesFetcherService.fetchDailyRates(date);

    if (!dailyRates) {
      throw new InvalidCurrencyExchangeException(`Daily exchange rate not found for day ${date.toISOString()}`);
    }

    const exchangeRate = dailyRates[baseCurrency];

    return

  }
}
