import { Injectable } from '@nestjs/common';
import Big from 'big.js';

import { ClientTurnoverService } from '../client-turnover/client-turnover.service';
import { Transaction } from '../transaction-processor/model/transaction';
import { CalculationStrategyNotFoundException } from './exception/calculation-strategy-not-found.exception';
import { CommissionCalculatorStrategyInterface } from './interface/commission-calculator-strategy.interface';
import { ClientDiscountStrategy } from './strategy/client-discount.strategy';
import { DefaultStrategy } from './strategy/default.strategy';
import { HighTurnoverStrategy } from './strategy/high-turnover.strategy';

@Injectable()
export class CommissionCalculatorService {
  private readonly strategies: CommissionCalculatorStrategyInterface[];

  public constructor(private readonly clientTurnoverService: ClientTurnoverService) {
    this.strategies = [
      new DefaultStrategy(),
      new ClientDiscountStrategy(),
      new HighTurnoverStrategy(clientTurnoverService),
    ];
  }

  public async calculateCommission(transaction: Transaction): Promise<Big> {
    const supportedStrategies = await this.getSupportedStrategies(transaction);

    // with currently implemented strategies it should never have happened
    if (!supportedStrategies.length) {
      throw new CalculationStrategyNotFoundException('No strategies were found, commission cannot be calculated');
    }

    const strategiesCalculationResults = supportedStrategies.map(strategy => strategy.calculate(transaction));

    if (strategiesCalculationResults.length === 1) {
      return strategiesCalculationResults[0];
    }

    const sortedCalculations = strategiesCalculationResults.sort((a, b) => a.toNumber() - b.toNumber());

    return sortedCalculations[0];
  }

  private async getSupportedStrategies(transaction: Transaction) {
    return (
      await Promise.all(
        this.strategies.map(async strategy => {
          if (await strategy.isSupported(transaction)) {
            return strategy;
          }
        }),
      )
    ).filter(Boolean);
  }
}
