import { Test, TestingModule } from '@nestjs/testing';

import { ClientTurnoverService } from './client-turnover.service';

describe('ClientTurnoverService', () => {
  let service: ClientTurnoverService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientTurnoverService],
    }).compile();

    service = module.get<ClientTurnoverService>(ClientTurnoverService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
