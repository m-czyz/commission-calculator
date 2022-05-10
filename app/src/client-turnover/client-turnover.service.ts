import { Injectable } from '@nestjs/common';
import Big from 'big.js';
import { Dayjs } from 'dayjs';

import { CustomerTurnoverReaderInterface } from '../commission-calculator/interface/customer-turnover-reader.interface';
import { ClientTurnoverRepository } from './client-turnover.repository';

@Injectable()
export class ClientTurnoverService implements CustomerTurnoverReaderInterface {
  public constructor(private clientTurnoverRepository: ClientTurnoverRepository) {}

  public async readEuroTurnoverInRange(clientId: number, from: Dayjs, to: Dayjs): Promise<Big> {
    return this.clientTurnoverRepository.getClientEuroTurnover(clientId, from, to);
  }
}
