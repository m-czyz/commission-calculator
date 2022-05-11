import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { TransactionCreateRequest } from './request/transaction-create.request';
import { TransactionCommissionResponse } from './response/transaction-commission.response';
import { TransactionProcessorService } from './transaction-processor.service';

@ApiTags('commission')
@Controller()
export class TransactionProcessorController {
  public constructor(private readonly transactionProcessorService: TransactionProcessorService) {}

  @Post()
  @ApiBody({ type: TransactionCreateRequest })
  @ApiOperation({
    summary: 'Post transaction and get commission',
  })
  @ApiResponse({
    status: 200,
    description: 'transaction commission',
    type: TransactionCommissionResponse,
  })
  public async calculateTransactionCommission(
    @Body() dto: TransactionCreateRequest,
  ): Promise<TransactionCommissionResponse> {
    return this.transactionProcessorService.processTransaction(dto);
  }
}
