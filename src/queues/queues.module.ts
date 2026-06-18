import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { EMAIL_QUEUE } from './email/email-queue.constants';
import { EmailProcessor } from './email/email.processor';
import { EmailQueueService } from './email/email-queue.service';
import { QueuesController } from './queues.controller';

@Module({
  imports: [
    BullModule.registerQueue({
      name: EMAIL_QUEUE,
    }),
  ],
  controllers: [QueuesController],
  providers: [EmailQueueService, EmailProcessor],
  exports: [EmailQueueService],
})
export class QueuesModule {}
