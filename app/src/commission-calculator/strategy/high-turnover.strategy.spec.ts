import Big from 'big.js';

import { CurrencyEnum } from '../../transaction-processor/enum/currency.enum';
import { utcDayjs } from '../../utc-dayjs';
import { CustomerTurnoverReaderInterface } from '../interface/customer-turnover-reader.interface';
import { HighTurnoverStrategy } from './high-turnover.strategy';

describe('HighTurnoverStrategy', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Should validate transaction', () => {
    it('Should return true if turnover is equal to 1000 euro', async () => {
      const turnoverReader: CustomerTurnoverReaderInterface = {
        readEuroTurnoverInRange: jest.fn(async () => Big(1000)),
      };

      expect(
        await new HighTurnoverStrategy(turnoverReader).isSupported({
          clientId: 42,
          date: utcDayjs('2020-01-01'),
          euroAmount: new Big(1),
          currency: CurrencyEnum.EUR,
          amount: new Big(1),
        }),
      ).toBe(true);
    });

    it('Should return true if turnover is over 1000 euro', async () => {
      const turnoverReader: CustomerTurnoverReaderInterface = {
        readEuroTurnoverInRange: jest.fn(async () => Big(1001)),
      };

      expect(
        await new HighTurnoverStrategy(turnoverReader).isSupported({
          clientId: 42,
          date: utcDayjs('2020-01-01'),
          euroAmount: new Big(1),
          currency: CurrencyEnum.EUR,
          amount: new Big(1),
        }),
      ).toBe(true);
    });

    it('Should return true if turnover less than 1000 euro', async () => {
      const turnoverReader: CustomerTurnoverReaderInterface = {
        readEuroTurnoverInRange: jest.fn(async () => Big(100)),
      };

      expect(
        await new HighTurnoverStrategy(turnoverReader).isSupported({
          clientId: 42,
          date: utcDayjs('2020-01-01'),
          euroAmount: new Big(1),
          currency: CurrencyEnum.EUR,
          amount: new Big(1),
        }),
      ).toBe(false);
    });

    it('Should call turnover reader with correct dates to fetch monthly turnover', async () => {
      const turnoverReader = {
        readEuroTurnoverInRange: jest.fn(async () => Big(100)),
      };

      await new HighTurnoverStrategy(turnoverReader).isSupported({
        clientId: 42,
        date: utcDayjs('2020-01-01'),
        euroAmount: new Big(1),
        currency: CurrencyEnum.EUR,
        amount: new Big(1),
      });

      expect(turnoverReader.readEuroTurnoverInRange).toBeCalledWith(
        42,
        utcDayjs('2020-01-01T00:00:00.000Z'),
        utcDayjs('2020-01-31T23:59:59.999Z'),
      );
    });
  });
});
