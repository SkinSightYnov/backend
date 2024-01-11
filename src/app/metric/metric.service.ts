import { Injectable } from '@nestjs/common';
import { Counter, Registry } from 'prom-client';

@Injectable()
export class MetricService {
  private readonly register: Registry;
  private readonly counter: Counter;

  constructor() {
    this.register = new Registry();
    this.counter = new Counter({
      name: 'http_requests_total',
      help: 'Total number of HTTP requests',
      registers: [this.register],
      labelNames: ['method', 'path', 'status'],
    });
    this.register.clear();
    this.register.setDefaultLabels({
      app: 'SkinSight',
    });
    this.register.registerMetric(this.counter);
  }

  increment(method: string, path: string, status: string) {
    this.counter.inc({ method, path, status });
  }

  getMetrics() {
    return this.register.metrics();
  }
}
