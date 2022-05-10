import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TransactionCommissionEntity } from '../transaction-persistance/transaction-commission.entity';
import { ClientTurnoverRepository } from './client-turnover.repository';
import { ClientTurnoverService } from './client-turnover.service';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionCommissionEntity])],
  providers: [ClientTurnoverService, ClientTurnoverRepository],
  exports: [ClientTurnoverService],
})
export class ClientTurnoverModule {}
