import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm/dist/common/typeorm.utils';
import * as nock from 'nock';
import * as request from 'supertest';
import { Repository } from 'typeorm';

import { AppModule } from '../src/app.module';
import { TransactionCommissionEntity } from '../src/transaction-persistance/transaction-commission.entity';

describe('TransactionProcessorController (e2e)', () => {
  let app: INestApplication;
  let repository: Repository<TransactionCommissionEntity>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    repository = app.get(getRepositoryToken(TransactionCommissionEntity));

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
      }),
    );

    await app.init();
  });

  beforeEach(async () => {
    await repository.query(`DELETE FROM transaction_commission;`);
    jest.restoreAllMocks();
  });

  afterAll(async () => {
    await repository.query(`DELETE FROM transaction_commission;`);
    await app.close();
  });

  describe('POST /', () => {
    describe('Should calculate commission successfully - simple cases', () => {
      it('Should calculate commission correctly using customer discount strategy', () => {
        return request(app.getHttpServer())
          .post('/')
          .send({
            date: '2021-01-01',
            amount: '100.00',
            currency: 'EUR',
            client_id: 42,
          })
          .expect(201)
          .expect({
            amount: '0.05',
            currency: 'EUR',
          });
      });

      it('Should calculate commission correctly using standard strategy (100 euro transaction)', () => {
        return request(app.getHttpServer())
          .post('/')
          .send({
            date: '2021-01-01',
            amount: '100.00',
            currency: 'EUR',
            client_id: 41,
          })
          .expect(201)
          .expect({ amount: '0.50', currency: 'EUR' });
      });

      it('Should calculate commission correctly using standard strategy (1 euro transaction)', () => {
        return request(app.getHttpServer())
          .post('/')
          .send({
            date: '2021-01-01',
            amount: '1.00',
            currency: 'EUR',
            client_id: 41,
          })
          .expect(201)
          .expect({ amount: '0.05', currency: 'EUR' });
      });

      it('Should calculate commission using default strategy with USD to EUR currency exchange ', () => {
        // mock 3rd party
        nock('https://api.exchangerate.host/')
          .get('/2021-01-01')
          .once()
          .reply(200, { rates: { USD: 1.217582 } });

        return request(app.getHttpServer())
          .post('/')
          .send({
            date: '2021-01-01',
            amount: '200.40',
            currency: 'USD',
            client_id: 41,
          })
          .expect(201)
          .expect({ amount: '0.82', currency: 'EUR' });
      });
    });

    describe('Should calculate commission successfully for high turnover customer', () => {
      it('Should calculate commission correctly for high turnover (2021-01) month - client with discount', async () => {
        await request(app.getHttpServer())
          .post('/')
          .send({
            date: '2021-01-01',
            amount: '500.00',
            currency: 'EUR',
            client_id: 42,
          })
          .expect(201)
          .expect({
            amount: '0.05',
            currency: 'EUR',
          });
        await request(app.getHttpServer())
          .post('/')
          .send({
            date: '2021-01-01',
            amount: '500.00',
            currency: 'EUR',
            client_id: 42,
          })
          .expect(201)
          .expect({
            amount: '0.05',
            currency: 'EUR',
          });
        await request(app.getHttpServer())
          .post('/')
          .send({
            date: '2021-01-01',
            amount: '500.00',
            currency: 'EUR',
            client_id: 42,
          })
          .expect(201)
          .expect({
            amount: '0.03',
            currency: 'EUR',
          });
      });

      it('Should calculate commission correctly for high turnover (2021-01) month - client without discount', async () => {
        await request(app.getHttpServer())
          .post('/')
          .send({
            date: '2021-01-01',
            amount: '500.00',
            currency: 'EUR',
            client_id: 41,
          })
          .expect(201)
          .expect({
            amount: '2.50',
            currency: 'EUR',
          });
        await request(app.getHttpServer())
          .post('/')
          .send({
            date: '2021-01-01',
            amount: '500.00',
            currency: 'EUR',
            client_id: 41,
          })
          .expect(201)
          .expect({
            amount: '2.50',
            currency: 'EUR',
          });
        await request(app.getHttpServer())
          .post('/')
          .send({
            date: '2021-01-01',
            amount: '500.00',
            currency: 'EUR',
            client_id: 41,
          })
          .expect(201)
          .expect({
            amount: '0.03',
            currency: 'EUR',
          });
        await request(app.getHttpServer())
          .post('/')
          .send({
            date: '2021-02-01',
            amount: '500.00',
            currency: 'EUR',
            client_id: 41,
          })
          .expect(201)
          .expect({
            amount: '2.50',
            currency: 'EUR',
          });
      });
    });

    describe('Should fail', () => {
      it('Should fail due to bad date', () => {
        return request(app.getHttpServer())
          .post('/')
          .send({
            date: 'XXXX-01-01',
            amount: '100.00',
            currency: 'EUR',
            client_id: 42,
          })
          .expect(400);
      });

      it('Should fail due to unsupported currency', () => {
        return request(app.getHttpServer())
          .post('/')
          .send({
            date: '2020-01-01',
            amount: '100.00',
            currency: 'TEST',
            client_id: 42,
          })
          .expect(400);
      });

      it('Should fail due to bad client id', () => {
        return request(app.getHttpServer())
          .post('/')
          .send({
            date: '2020-01-01',
            amount: '100.00',
            currency: 'TEST',
            client_id: '42',
          })
          .expect(400);
      });

      describe('Should fail due to malformed amount', () => {
        const cases = ['-1', -1, {}, 0, '0'];

        test.each(cases)('Should fail due to invalid amount: %p', async amount => {
          await request(app.getHttpServer())
            .post('/')
            .send({
              date: '2020-01-01',
              amount,
              currency: 'EUR',
              client_id: 42,
            })
            .expect(400);
        });
      });

      it('Should fail due to date greater than today', async () => {
        await request(app.getHttpServer())
          .post('/')
          .send({
            date: '2220-01-02', // cutting corners
            amount: '100.00',
            currency: 'EUR',
            client_id: 42,
          })
          .expect(400);
      });
    });
  });
});
