import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

import { utcDayjs } from '../../utc-dayjs';

export function IsStringDateFormat(dateFormat: string, validationOptions?: ValidationOptions) {
  return function <T>(object: T, propertyName: string) {
    registerDecorator({
      name: 'IsStringDateFormat',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === 'string' && utcDayjs(value, dateFormat, true).isValid();
        },
      },
    });
  };
}
