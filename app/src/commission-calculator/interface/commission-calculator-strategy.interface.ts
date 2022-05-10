import Big from 'big.js';

import { CommissionTransaction } from '../model/commission-transaction';

export interface CommissionCalculatorStrategyInterface {
  isSupported(transaction: CommissionTransaction): Promise<boolean>;

  calculate(transaction: CommissionTransaction): Big;
}
