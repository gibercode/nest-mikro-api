import 'dotenv/config';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { ReflectMetadataProvider } from '@mikro-orm/decorators/legacy';
import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';

const isProduction = process.env.NODE_ENV === 'production';

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
    path: isProduction ? './dist/src/db/migrations' : './src/db/migrations',
    pathTs: './src/db/migrations',
  },
  seeder: {
    path: isProduction ? './dist/src/seeders' : './src/seeders',
    pathTs: './src/seeders',
    glob: '!(*.d).{js,ts}',
    emit: 'ts',
    fileName: (className: string) => className,
  },
  debug: process.env.NODE_ENV !== 'production',
};

export default ormCOnfig;
