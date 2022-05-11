import Big from 'big.js';

import { Transaction } from '../../transaction-processor/model/transaction';
import { CommissionCalculatorStrategyInterface } from '../interface/commission-calculator-strategy.interface';

export class DefaultStrategy implements CommissionCalculatorStrategyInterface {
  public constructor(
    private readonly minimumCommission = new Big('0.05'),
    private readonly commissionPercentage = new Big('0.005'),
  ) {}

  public calculate(transaction: Transaction): Big {
    const amount = transaction.euroAmount;

    const commissionPercentageValue = amount.times(this.commissionPercentage);

    if (commissionPercentageValue.lte(this.minimumCommission)) {
      return this.minimumCommission;
    }

    return commissionPercentageValue;
  }

  public async isSupported(transaction: Transaction): Promise<boolean> {
    return true;
  }
}
