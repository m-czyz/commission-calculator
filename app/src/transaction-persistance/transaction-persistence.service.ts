import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Big from 'big.js';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { CurrencyEnum } from '../transaction-processor/enum/currency.enum';
import { Transaction } from '../transaction-processor/model/transaction';
import { TransactionCommissionEntity } from './transaction-commission.entity';

@Injectable()
export class TransactionPersistenceService {
  public constructor(
    @InjectRepository(TransactionCommissionEntity)
    private transactionCommissionEntityRepository: Repository<TransactionCommissionEntity>,
  ) {}

  public save(transaction: Transaction, commissionAmount: Big, commissionCurrency: CurrencyEnum) {
    return this.transactionCommissionEntityRepository.save({
      id: uuid(),
      clientId: transaction.clientId,
      amount: transaction.amount.toString(),
      euroAmount: transaction.euroAmount.toFixed(2),
      currency: transaction.currency,
      date: transaction.date.toDate(),
      commissionAmount: commissionAmount.toFixed(2),
      commissionCurrency: commissionCurrency,
    });
  }
}
