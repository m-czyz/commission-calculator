import Big from 'big.js';

import { CommissionCalculatorStrategyInterface } from '../interface/commission-calculator-strategy.interface';
import { CommissionTransaction } from '../model/commission-transaction';

export class ClientDiscountStrategy implements CommissionCalculatorStrategyInterface {
  public constructor(private readonly clientIdsWithDiscount = [42]) {}

  public calculate(transaction: CommissionTransaction): Big {
    return new Big('0.05');
  }

  public async isSupported(transaction: CommissionTransaction): Promise<boolean> {
    return this.clientIdsWithDiscount.includes(transaction.clientId);
  }
}
