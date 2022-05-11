import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DATABASE_CONFIG } from './database-config';
import { TransactionProcessorModule } from './transaction-processor/transaction-processor.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...DATABASE_CONFIG,
    }),
    TransactionProcessorModule,
  ],
})
export class AppModule {}
