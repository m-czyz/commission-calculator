import { Injectable } from '@nestjs/common';
import Big from 'big.js';
import { Dayjs } from 'dayjs';

import { ClientTurnoverService } from '../client-turnover/client-turnover.service';
import { CurrencyExchangeService } from '../currency-exchange/currency-exchange.service';
import { TransactionPersistenceService } from '../transaction-persistance/transaction-persistence.service';
import { CurrencyEnum } from './enum/currency.enum';
import { CommissionCalculatorStrategyInterface } from './interface/commission-calculator-strategy.interface';
import { CommissionTransaction } from './model/commission-transaction';
import { CommissionTransactionRequest } from './request/commission-transaction.request';
import { ClientDiscountStrategy } from './strategy/client-discount.strategy';
import { DefaultStrategy } from './strategy/default.strategy';
import { HighTurnoverStrategy } from './strategy/high-turnover.strategy';

@Injectable()
export class CommissionCalculatorService {
  private readonly strategies: CommissionCalculatorStrategyInterface[];

  public constructor(
    private readonly clientTurnoverService: ClientTurnoverService,
    private readonly CurrencyExchangeService: CurrencyExchangeService,
    private readonly transactionPersistenceService: TransactionPersistenceService,
  ) {
    this.strategies = [
      new DefaultStrategy(),
      new ClientDiscountStrategy(),
      new HighTurnoverStrategy(clientTurnoverService),
    ];
  }

  public async calculateCommission(transactionDto: CommissionTransactionRequest) {
    const supportedStrategies = await this.getSupportedStrategies(transactionDto);

    const strategiesCalculationResults = supportedStrategies.map(strategy => strategy.calculate(transactionDto));

    const sortedCalculations = strategiesCalculationResults.sort((a, b) => a.toNumber() - b.toNumber());
  }

  private async getSupportedStrategies(transactionDto: CommissionTransactionRequest) {
    return (
      await Promise.all(
        this.strategies.map(async strategy => {
          if (await strategy.isSupported(transactionDto)) {
            return strategy;
          }
        }),
      )
    ).filter(Boolean);
  }

  private async convertRequestIntoModel(transactionDto: CommissionTransactionRequest): CommissionTransaction {
    const amount = new Big(transactionDto.amount);
    const day = new Dayjs(transactionDto.date);

    if (transactionDto.currency === CurrencyEnum.EUR) {
      return {
        clientId: transactionDto.client_id,
        amount,
        euroAmount: new Big(transactionDto.amount),
        date: day,
        currency: CurrencyEnum.EUR,
      };
    } else {
      const euroValue = await this.CurrencyExchangeService.exchangeToEuro(amount, transactionDto.currency, day);
    }
  }
}
