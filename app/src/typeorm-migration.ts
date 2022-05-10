import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';

import { DATABASE_CONFIG } from './database-config';

export = {
  ...DATABASE_CONFIG,
  migrations: ['migrations/*.ts'],
  cli: {
    migrationsDir: 'migrations',
  },
  synchronize: false,
} as TypeOrmModuleOptions;
