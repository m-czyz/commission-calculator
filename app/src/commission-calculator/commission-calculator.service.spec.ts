import Big from 'big.js';

import { CurrencyEnum } from '../transaction-processor/enum/currency.enum';
import { utcDayjs } from '../utc-dayjs';
import { CommissionCalculatorService } from './commission-calculator.service';
import { CustomerTurnoverReaderInterface } from './interface/customer-turnover-reader.interface';

describe('CommissionCalculatorService', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Should use discount client strategy to return lowest value', async () => {
    const turnoverReader: CustomerTurnoverReaderInterface = {
      readEuroTurnoverInRange: jest.fn(async () => Big(100)),
    };

    const commissionCalculatorService = new CommissionCalculatorService(turnoverReader as any);

    const transaction = {
      clientId: 42,
      date: utcDayjs('2020-01-01'),
      euroAmount: new Big(1),
      currency: CurrencyEnum.EUR,
      amount: new Big(1),
    };

    const value = await commissionCalculatorService.calculateCommission(transaction);

    expect(value.toFixed(2)).toBe(new Big('0.05').toFixed(2));
  });

  it('Should use default to return lowest value', async () => {
    const turnoverReader: CustomerTurnoverReaderInterface = {
      readEuroTurnoverInRange: jest.fn(async () => Big(100)),
    };

    const commissionCalculatorService = new CommissionCalculatorService(turnoverReader as any);

    const transaction = {
      clientId: 41,
      date: utcDayjs('2020-01-01'),
      euroAmount: new Big(100),
      currency: CurrencyEnum.EUR,
      amount: new Big(1),
    };

    const value = await commissionCalculatorService.calculateCommission(transaction);

    expect(value.toFixed(2)).toBe(new Big('0.50').toFixed(2));
  });

  it('Should use high turnover strategy to return lowest value', async () => {
    const turnoverReader: CustomerTurnoverReaderInterface = {
      readEuroTurnoverInRange: jest.fn(async () => Big(1000)),
    };

    const commissionCalculatorService = new CommissionCalculatorService(turnoverReader as any);

    const transaction = {
      clientId: 41,
      date: utcDayjs('2020-01-01'),
      euroAmount: new Big(100),
      currency: CurrencyEnum.EUR,
      amount: new Big(1),
    };

    const value = await commissionCalculatorService.calculateCommission(transaction);

    expect(value.toFixed(2)).toBe(new Big('0.03').toFixed(2));
  });
});
