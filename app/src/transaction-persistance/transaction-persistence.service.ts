import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Big from 'big.js';
import { Repository } from 'typeorm';
import { uuid } from 'uuidv4';

import { CurrencyEnum } from '../commission-calculator/enum/currency.enum';
import { CommissionTransaction } from '../commission-calculator/model/commission-transaction';
import { TransactionCommissionEntity } from './transaction-commission.entity';

@Injectable()
export class TransactionPersistenceService {
  public constructor(
    @InjectRepository(TransactionCommissionEntity)
    private transactionCommissionEntityRepository: Repository<TransactionCommissionEntity>,
  ) {}

  public save(transaction: CommissionTransaction, commissionAmount: Big, commissionCurrency: CurrencyEnum) {
    return this.transactionCommissionEntityRepository.save({
      id: uuid(),
      clientId: transaction.clientId,
      amount: transaction.amount.toString(),
      euroAmount: transaction.euroAmount.toFixed(2),
      currency: transaction.currency,
      date: transaction.date.toDate(),
      commissionAmount: commissionAmount.toFixed(2),
      commissionCurrency: CurrencyEnum.EUR,
    });
  }
}
