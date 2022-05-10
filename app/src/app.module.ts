import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommissionCalculatorModule } from './commission-calculator/commission-calculator.module';
import { DATABASE_CONFIG } from './database-config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...DATABASE_CONFIG,
    }),
    CommissionCalculatorModule,
  ],
})
export class AppModule {}
