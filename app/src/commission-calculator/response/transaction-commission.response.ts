import { ApiProperty } from '@nestjs/swagger';

import { CurrencyEnum } from '../enum/currency.enum';

export class TransactionCommissionResponse {
  @ApiProperty()
  public amount: string;

  @ApiProperty()
  public currency: CurrencyEnum;
}
