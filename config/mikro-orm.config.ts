import 'dotenv/config';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { ReflectMetadataProvider } from '@mikro-orm/decorators/legacy';
import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';

const ormCOnfig: MikroOrmModuleOptions = {
  driver: PostgreSqlDriver,
  metadataProvider: ReflectMetadataProvider,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  autoLoadEntities: true,
  migrations: {
    path: './src/db/migrations',
    pathTs: './src/db/migrations',
  },
  seeder: {
    path: './src/db/seeders',
    pathTs: './src/db/seeders',
    glob: '!(*.d).{js,ts}',
    emit: 'ts',
    fileName: (className: string) => className,
  },
  debug: process.env.NODE_ENV !== 'production',
};

export default ormCOnfig;
