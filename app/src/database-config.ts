import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import { TransactionCommissionEntity } from './transaction-persistance/transaction-commission.entity';

const { POSTGRES_DB_HOST, POSTGRES_DB_PORT, POSTGRES_DB_USER, POSTGRES_DB_PASSWORD, POSTGRES_DB_DATABASE } =
  process.env;

export const DATABASE_CONFIG = {
  type: 'postgres',
  host: POSTGRES_DB_HOST,
  port: POSTGRES_DB_PORT ? +POSTGRES_DB_PORT : 5432,
  username: POSTGRES_DB_USER,
  password: POSTGRES_DB_PASSWORD,
  database: POSTGRES_DB_DATABASE,
  extra: { characterSet: 'UTF8' },
  entities: [TransactionCommissionEntity],
} as PostgresConnectionOptions;
