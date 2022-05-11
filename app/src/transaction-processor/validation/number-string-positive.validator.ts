import Big from 'big.js';
import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function IsNumberStringPositive(validationOptions?: ValidationOptions) {
  return function <T>(object: T, propertyName: string) {
    registerDecorator({
      name: 'IsNumberStringPositive',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === 'string' && new Big(value).toNumber() > 0;
        },
      },
    });
  };
}
