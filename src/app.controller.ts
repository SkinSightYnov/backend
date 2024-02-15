import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import logger from './logger/logger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    logger.info('Hello World');
    return this.appService.getHello();
  }
}
