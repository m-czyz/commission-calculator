import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Dayjs } from 'dayjs';
import { lastValueFrom, map } from 'rxjs';

import { CurrencyEnum } from '../commission-calculator/enum/currency.enum';
import { CurrencyRatesResponse } from './currency-rates.response';

@Injectable()
export class CurrencyRatesFetcherService {
  private readonly API_URL = 'https://api.exchangerate.host';

  public constructor(private httpService: HttpService, @Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  public async fetchDailyRates(day: Dayjs): Promise<Record<CurrencyEnum, number>> {
    const formattedDay = day.format('YYYY-MM-DD');

    const cached = await this.getFromCache(formattedDay);

    if (cached) {
      return cached;
    }

    try {
      return await this.fetchRates(formattedDay);
    } catch (e) {
      throw new NotFoundException(`Currency daily rate not found for the day ${formattedDay}`);
    }
  }

  private async fetchRates(key: string): Promise<Record<CurrencyEnum, number>> {
    const { rates } = await lastValueFrom(
      this.httpService.get<CurrencyRatesResponse>(`${this.API_URL}/${key}`).pipe(map(response => response.data)),
    );

    await this.cacheManager.set(key, rates, {
      ttl: 0,
    });

    return rates;
  }

  private getFromCache(key: string): Promise<Record<CurrencyEnum, number>> {
    return this.cacheManager.get<Record<CurrencyEnum, number>>(key);
  }
}
