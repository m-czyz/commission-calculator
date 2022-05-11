import { Injectable } from '@nestjs/common';
import Big from 'big.js';
import * as dayjs from 'dayjs';

import { CommissionCalculatorService } from '../commission-calculator/commission-calculator.service';
import { CurrencyExchangeService } from '../currency-exchange/currency-exchange.service';
import { TransactionPersistenceService } from '../transaction-persistance/transaction-persistence.service';
import { CurrencyEnum } from './enum/currency.enum';
import { Transaction } from './model/transaction';
import { TransactionCreateRequest } from './request/transaction-create.request';
import { TransactionCommissionResponse } from './response/transaction-commission.response';

@Injectable()
export class TransactionProcessorService {
  public constructor(
    private readonly commissionCalculatorService: CommissionCalculatorService,
    private readonly currencyExchangeService: CurrencyExchangeService,
    private readonly transactionPersistenceService: TransactionPersistenceService,
  ) {}

  public async processTransaction(dto: TransactionCreateRequest): Promise<TransactionCommissionResponse> {
    const transaction = await this.convertRequestIntoModel(dto);

    const commission = await this.commissionCalculatorService.calculateCommission(transaction);

    await this.transactionPersistenceService.save(transaction, commission, CurrencyEnum.EUR);

    return {
      amount: commission.toFixed(2),
      currency: CurrencyEnum.EUR,
    };
  }

  private async convertRequestIntoModel(dto: TransactionCreateRequest): Promise<Transaction> {
    const amount = new Big(dto.amount);
    const date = dayjs(dto.date);

    if (dto.currency === CurrencyEnum.EUR) {
      return {
        clientId: dto.client_id,
        amount,
        date,
        euroAmount: amount,
        currency: CurrencyEnum.EUR,
      };
    } else {
      const euroAmount = await this.currencyExchangeService.exchangeToEuro(amount, dto.currency, date);

      return {
        clientId: dto.client_id,
        amount,
        euroAmount,
        date,
        currency: dto.currency,
      };
    }
  }
}
