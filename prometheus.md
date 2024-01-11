# Set up Prometheus

## Install Dependencies

```bash
npm prom-client --save
```

## Create a Prometheus Client

```ts
// metric.service.ts

import { Injectable } from '@nestjs/common';
import { Counter, Register } from 'prom-client';

@Injectable()
export class MetricService {
  private readonly register: Register;
  private readonly counter: Counter;

  constructor() {
    this.register = new Register();
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

```

## Add a Middleware

```ts
// metric.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { MetricService } from './metric.service';

@Injectable()
export class MetricMiddleware implements NestMiddleware {
  constructor(private readonly metricService: MetricService) {}

  use(req: Request, res: Response, next: Function) {
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      this.metricService.increment(
        req.method,
        req.path,
        res.statusCode.toString(),
      );
    });
    next();
  }
}

```

## Add a Controller

```ts
// metric.controller.ts

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

```

## Add a Module

```ts
// metric.module.ts

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

```

## Add a Module to the App Module

```ts
// app.module.ts

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MetricModule } from './metric/metric.module';

@Module({
  imports: [MetricModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

```
