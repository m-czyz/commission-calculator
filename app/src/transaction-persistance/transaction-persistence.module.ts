import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TransactionCommissionEntity } from './transaction-commission.entity';
import { TransactionPersistenceService } from './transaction-persistence.service';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionCommissionEntity])],
  providers: [TransactionPersistenceService],
})
export class TransactionPersistenceModule {}
