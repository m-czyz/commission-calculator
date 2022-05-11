import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

import { utcDayjs } from '../../utc-dayjs';

export function MaxStringDate(max: Date, validationOptions?: ValidationOptions) {
  return function <T>(object: T, propertyName: string) {
    registerDecorator({
      name: 'MaxStringDate',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === 'string' && utcDayjs(value).isBefore(max);
        },
      },
    });
  };
}
