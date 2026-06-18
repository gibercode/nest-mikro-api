import { Seeder } from '@mikro-orm/seeder';
import { EntityManager } from '@mikro-orm/core';

export class DatabaseSeeder extends Seeder {
  async run(_em: EntityManager): Promise<void> {}
}
