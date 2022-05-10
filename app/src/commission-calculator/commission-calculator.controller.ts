import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CommissionCalculatorService } from './commission-calculator.service';
import { CommissionTransactionRequest } from './request/commission-transaction.request';
import { TransactionCommissionResponse } from './response/transaction-commission.response';

@ApiTags('commission')
@Controller('commission-calculator')
export class CommissionCalculatorController {
  public constructor(private readonly commissionCalculatorService: CommissionCalculatorService) {}

  @Post()
  @ApiBody({ type: CommissionTransactionRequest })
  @ApiOperation({
    summary: 'Post transaction and get commission',
  })
  @ApiResponse({
    status: 200,
    description: 'transaction commission',
    type: TransactionCommissionResponse,
  })
  public async calculateTransactionCommission(
    @Body() dto: CommissionTransactionRequest,
  ): Promise<TransactionCommissionResponse> {
    return this.commissionCalculatorService.calculateCommission(dto);
  }
}
