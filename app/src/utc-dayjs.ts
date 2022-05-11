import { ConfigType, Dayjs } from 'dayjs';
import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
import * as utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(customParseFormat); // use plugin

export const utcDayjs = (config?: ConfigType, format?: string, strict?: boolean): Dayjs =>
  dayjs.utc(config, format, strict);
