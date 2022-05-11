import Big from 'big.js';

import { Transaction } from '../../transaction-processor/model/transaction';

export interface CommissionCalculatorStrategyInterface {
  isSupported(transaction: Transaction): Promise<boolean>;

  calculate(transaction: Transaction): Big;
}
