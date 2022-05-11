import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNumberString, Min } from 'class-validator';

import { utcDayjs } from '../../utc-dayjs';
import { CurrencyEnum } from '../enum/currency.enum';
import { MaxStringDate } from '../validation/max-string-date.validator';
import { IsNumberStringPositive } from '../validation/number-string-positive.validator';
import { IsStringDateFormat } from '../validation/string-date-format.validator';

export class TransactionCreateRequest {
  @ApiProperty({
    description: 'transaction date',
    type: String,
  })
  @IsStringDateFormat('YYYY-MM-DD', {
    message: 'Date should be in YYYY-MM-DD format',
  })
  @MaxStringDate(utcDayjs().endOf('day').toDate(), {
    message: 'Date should not be in the future',
  })
  public date: string;

  @ApiProperty({
    description: 'transaction value',
  })
  @IsNumberString()
  @IsNumberStringPositive({
    message: 'Amount should be a number string greater than 0',
  })
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
