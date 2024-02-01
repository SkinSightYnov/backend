import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { MetricService } from './metric.service';

@Injectable()
export class MetricMiddleware implements NestMiddleware {
  constructor(private readonly metricService: MetricService) {}

  use(req: Request, res: Response, next: NextFunction) {
    // const start = Date.now();
    res.on('finish', () => {
      // const duration = Date.now() - start;
      this.metricService.increment(
        req.method,
        req.path,
        res.statusCode.toString(),
      );
    });
    next();
  }
}
