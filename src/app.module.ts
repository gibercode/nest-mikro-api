import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { CacheModule } from '@nestjs/cache-manager';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { BullModule } from '@nestjs/bullmq';
import { bullmqConfig, ormConfig, redisConfig, throttlerConfig } from 'config';
import { UsersModule } from './endpoints/users/users.module';
import { QueuesModule } from './queues/queues.module';

@Module({
  imports: [
    CacheModule.registerAsync(redisConfig),
    ThrottlerModule.forRoot(throttlerConfig),
    BullModule.forRoot(bullmqConfig),
    MikroOrmModule.forRoot(ormConfig),
    UsersModule,
    QueuesModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
