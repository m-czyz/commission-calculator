import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';
import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat); // use plugin

export function IsStringDateFormat(dateFormat: string, validationOptions?: ValidationOptions) {
  return function <T>(object: T, propertyName: string) {
    registerDecorator({
      name: 'IsStringDateFormat',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === 'string' && dayjs(value, dateFormat, true).isValid();
        },
      },
    });
  };
}
