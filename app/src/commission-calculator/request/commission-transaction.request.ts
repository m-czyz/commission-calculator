import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNumberString,
  Min,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

import { CurrencyEnum } from '../enum/currency.enum';

export class CommissionTransactionRequest {
  @ApiProperty({
    description: 'transaction date',
    type: String,
  })
  @IsDateString()
  @Type(() => Date)
  public date: Date;

  @ApiProperty({
    description: 'transaction value',
  })
  @IsNumberString()
  public amount: string;

  @ApiProperty({
    description: 'transaction currency',
  })
  @IsEnum(CurrencyEnum)
  public currency: string;

  @ApiProperty({
    description: 'client id',
  })
  @IsInt()
  @Min(0)
  public client_id: number;
}

export function IsStringDateFormat(property: string, validationOptions?: ValidationOptions) {
  return function <T>(object: T, propertyName: string) {
    registerDecorator({
      name: 'IsStringDateFormat',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return typeof value === 'string' && typeof relatedValue === 'string' && value.length > relatedValue.length; // you can return a Promise<boolean> here as well, if you want to make async validation
        },
      },
    });
  };
}

// {
//   "date": "2021-01-01",
//   "amount": "100.00",
//   "currency": "EUR",
//   "client_id": 42
// }
