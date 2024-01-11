import { Controller, Get } from '@nestjs/common';
import { MetricService } from './metric.service';

@Controller('metrics')
export class MetricController {
  constructor(private readonly metricService: MetricService) {}

  @Get()
  getMetrics() {
    return this.metricService.getMetrics();
  }
}
