import { Module } from '@nestjs/common';
import { MetricController } from './metric.controller';
import { MetricMiddleware } from './metric.middleware';
import { MetricService } from './metric.service';

@Module({
  controllers: [MetricController],
  providers: [MetricService],
})
export class MetricModule {
  configure(consumer) {
    consumer.apply(MetricMiddleware).forRoutes('*');
  }
}
