import Big from 'big.js';
import { Dayjs } from 'dayjs';

export interface CustomerTurnoverReaderInterface {
  readEuroTurnoverInRange(clientId: number, from: Dayjs, to: Dayjs): Promise<Big>;
}
