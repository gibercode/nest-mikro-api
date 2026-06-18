import { Logger } from '@nestjs/common';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { EMAIL_QUEUE, SEND_WELCOME_EMAIL_JOB } from './email-queue.constants';
import { WelcomeEmailJob } from './email-queue.types';

@Processor(EMAIL_QUEUE)
export class EmailProcessor extends WorkerHost {
  private readonly logger = new Logger(EmailProcessor.name);

  async process(job: Job<WelcomeEmailJob>): Promise<void> {
    if (job.name !== SEND_WELCOME_EMAIL_JOB) {
      this.logger.warn(`Skipping unknown job "${job.name}"`);
      return;
    }

    this.logger.log(
      `Processing welcome email job ${job.id} for ${job.data.email}`,
    );
    await new Promise((resolve) => setTimeout(resolve, 500));
    this.logger.log(`Welcome email job ${job.id} completed`);
  }
}
