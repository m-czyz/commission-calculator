import Big from 'big.js';

import { CommissionCalculatorStrategyInterface } from '../interface/commission-calculator-strategy.interface';
import { CommissionTransaction } from '../model/commission-transaction';

export class DefaultStrategy implements CommissionCalculatorStrategyInterface {
  public constructor(
    private readonly minimumCommission = new Big('0.05'),
    private readonly commissionPercentage = new Big('0.005'),
  ) {}

  public calculate(transaction: CommissionTransaction): Big {
    const amount = new Big(transaction.amount);

    const commissionPercentageValue = amount.times(this.commissionPercentage);

    if (commissionPercentageValue.lte(this.minimumCommission)) {
      return this.minimumCommission;
    }

    return commissionPercentageValue;
  }

  public async isSupported(transaction: CommissionTransaction): Promise<boolean> {
    return true;
  }
}
