import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Big from 'big.js';
import { Dayjs } from 'dayjs';
import { Repository } from 'typeorm';

import { TransactionCommissionEntity } from '../transaction-persistance/transaction-commission.entity';

@Injectable()
export class ClientTurnoverRepository {
  public constructor(
    @InjectRepository(TransactionCommissionEntity)
    private transactionCommissionEntityRepository: Repository<TransactionCommissionEntity>,
  ) {}

  public async getClientEuroTurnover(clientId: number, from: Dayjs, to: Dayjs): Promise<Big> {
    const euroTurnover = await this.transactionCommissionEntityRepository
      .createQueryBuilder()
      .select(`COALESCE(SUM("euroAmount"), 0)`, 'monthlyTurnover')
      .where(`"clientId" = :clientId`, { clientId })
      .andWhere(`date BETWEEN :startDate AND :endDate`, { startDate: from.toDate(), endDate: to.toDate() })
      .getRawOne();

    return new Big(euroTurnover.monthlyTurnover);
  }
}
