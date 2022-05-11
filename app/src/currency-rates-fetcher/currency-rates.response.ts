import { CurrencyEnum } from '../transaction-processor/enum/currency.enum';

export interface CurrencyRatesResponse {
  success: boolean;
  historical: boolean;
  base: string;
  date: string;
  rates: Record<CurrencyEnum, number>;
}
