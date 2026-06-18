import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { EmailQueueService } from './email/email-queue.service';

class EnqueueWelcomeEmailDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  userName?: string;
}

@ApiTags('queues')
@Controller('queues')
export class QueuesController {
  constructor(private readonly emailQueueService: EmailQueueService) {}

  @ApiOperation({ summary: 'Encolar un email de bienvenida de prueba' })
  @ApiBody({ type: EnqueueWelcomeEmailDto })
  @ApiResponse({ status: 201, description: 'Job encolado' })
  @Post('email/test')
  enqueueWelcomeEmail(@Body() body: EnqueueWelcomeEmailDto) {
    return this.emailQueueService.addWelcomeEmailJob(body);
  }
}
