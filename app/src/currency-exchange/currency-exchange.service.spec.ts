import { Test, TestingModule } from '@nestjs/testing';
import Big from 'big.js';
import * as dayjs from 'dayjs';
import * as nock from 'nock';

import { CurrencyEnum } from '../transaction-processor/enum/currency.enum';
import { CurrencyExchangeModule } from './currency-exchange.module';
import { CurrencyExchangeService } from './currency-exchange.service';

describe('CurrencyExchangeService', () => {
  let service: CurrencyExchangeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CurrencyExchangeModule],
    }).compile();

    service = module.get<CurrencyExchangeService>(CurrencyExchangeService);
  });

  it('should exchange USD to EUR', async () => {
    nock('https://api.exchangerate.host/')
      .get('/2021-01-01')
      .once()
      .reply(200, { rates: { USD: 1.217582 } });

    const valueInEuro = await service.exchangeToEuro(new Big(100), CurrencyEnum.USD, dayjs('2021-01-01'));

    expect(valueInEuro.toFixed(2)).toBe(new Big('82.13').toFixed());
  });
});
