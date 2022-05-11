import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNumberString, Min } from 'class-validator';

import { CurrencyEnum } from '../enum/currency.enum';
import { IsStringDateFormat } from '../validation/string-date-format.validator';

export class TransactionCreateRequest {
  @ApiProperty({
    description: 'transaction date',
    type: String,
  })
  @IsStringDateFormat('YYYY-MM-DD')
  public date: string;

  @ApiProperty({
    description: 'transaction value',
  })
  @IsNumberString()
  public amount: string;

  @ApiProperty({
    description: 'transaction currency',
  })
  @IsEnum(CurrencyEnum)
  public currency: CurrencyEnum;

  @ApiProperty({
    description: 'client id',
  })
  @IsInt()
  @Min(0)
  public client_id: number;
}
