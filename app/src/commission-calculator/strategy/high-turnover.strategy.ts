import Big from 'big.js';

import { CommissionCalculatorStrategyInterface } from '../interface/commission-calculator-strategy.interface';
import { CustomerTurnoverReaderInterface } from '../interface/customer-turnover-reader.interface';
import { CommissionTransaction } from '../model/commission-transaction';

export class HighTurnoverStrategy implements CommissionCalculatorStrategyInterface {
  public constructor(
    private readonly customerTurnoverReader: CustomerTurnoverReaderInterface,
    private readonly highTurnoverCommissionAmount = new Big('0.03'),
    private readonly turnoverThreshold = new Big('1000'),
  ) {}

  public calculate(transaction: CommissionTransaction): Big {
    return this.highTurnoverCommissionAmount;
  }

  public async isSupported({ date, clientId, euroAmount }: CommissionTransaction): Promise<boolean> {
    const from = date.startOf('month');
    const to = date.endOf('month');

    const monthlyTurnover = await this.customerTurnoverReader.readEuroTurnoverInRange(clientId, from, to);

    const currentTransactionPlusMonthly = monthlyTurnover.plus(euroAmount);

    return currentTransactionPlusMonthly.gte(this.turnoverThreshold);
  }
}
