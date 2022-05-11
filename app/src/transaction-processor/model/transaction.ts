import Big from 'big.js';
import { Dayjs } from 'dayjs';

import { CurrencyEnum } from '../enum/currency.enum';

export class Transaction {
  public clientId: number;
  public date: Dayjs;
  public amount: Big;
  public euroAmount: Big;
  public currency: CurrencyEnum;
}
