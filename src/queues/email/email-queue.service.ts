import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { EMAIL_QUEUE, SEND_WELCOME_EMAIL_JOB } from './email-queue.constants';
import { WelcomeEmailJob } from './email-queue.types';

@Injectable()
export class EmailQueueService {
  constructor(@InjectQueue(EMAIL_QUEUE) private readonly emailQueue: Queue) {}

  async addWelcomeEmailJob(data: WelcomeEmailJob) {
    const job = await this.emailQueue.add(SEND_WELCOME_EMAIL_JOB, data, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 1000,
      },
      removeOnComplete: true,
      removeOnFail: false,
    });

    return { jobId: job.id, queue: EMAIL_QUEUE };
  }
}
