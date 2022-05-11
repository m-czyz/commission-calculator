import Big from 'big.js';

import { Transaction } from '../../transaction-processor/model/transaction';
import { CommissionCalculatorStrategyInterface } from '../interface/commission-calculator-strategy.interface';

export class ClientDiscountStrategy implements CommissionCalculatorStrategyInterface {
  public constructor(private readonly clientIdsWithDiscount = [42]) {}

  public calculate(transaction: Transaction): Big {
    return new Big('0.05');
  }

  public async isSupported(transaction: Transaction): Promise<boolean> {
    return this.clientIdsWithDiscount.includes(transaction.clientId);
  }
}
