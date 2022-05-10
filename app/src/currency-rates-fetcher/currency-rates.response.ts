import { CurrencyEnum } from '../commission-calculator/enum/currency.enum';

export interface CurrencyRatesResponse {
  success: boolean;
  historical: boolean;
  base: string;
  date: string;
  rates: Record<CurrencyEnum, number>;
}
