# Set up Logging

## Utility dependencies

  ```bash
  npm i -D winston
  npm i -D winston-daily-rotate-file
  ```

## Create a logger

  ```ts
  // logger/logger.service.ts
  import winston from 'winston';

  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
      //
      // - Write to all logs with level `info` and below to `combined.log`
      // - Write all logs error (and below) to `error.log`.
      //
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
  });

  //
  // If we're not in production then log to the `console` with the format:
  // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
  //
  if (process.env.NODE_ENV !== 'production') {
    logger.add(
      new winston.transports.Console({
        format: winston.format.simple(),
      })
    );
  }

  export default logger;

  ```

## Set daily rotate file
```ts
// logger/logger.service.ts

import DailyRotateFile from 'winston-daily-rotate-file';
// ...
logger.configure({
  level: 'verbose',
  transports: [
    new DailyRotateFile({
      filename: 'application-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
})
```

## Set up logging middleware

```ts
// logger/logger.middleware.ts

import { NestMiddleware, Injectable, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl } = req;
    const userAgent = req.get('user-agent') || '';

    res.on('finish', () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length');

      this.logger.log(
        `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`
      );
    });

    next();
  }
}
```


## Set up logging interceptor

```ts
// logger/logger.interceptor.ts

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const method = req.method;
    const url = req.url;
    const now = Date.now();

    return next
      .handle()
      .pipe(
        tap(() =>
          this.logger.log(
            `${method} ${url} ${Date.now() - now}ms`,
            context.getClass().name
          )
        )
      );
  }
}
```

## Set up logging filter

```ts
// logger/logger.filter.ts

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : exception;

    this.logger.error(
      `Http Status: ${status} Error Message: ${JSON.stringify(message)}`
    );

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
```

## Set up logging pipes

```ts
// logger/logger.pipe.ts

import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Logger } from './logger.service';

@Injectable()
export class LoggingPipe implements PipeTransform {
  private readonly logger = new Logger(LoggingPipe.name);

  transform(value: any, metadata: ArgumentMetadata) {
    const requestId = uuidv4();
    this.logger.log(
      `Request ${requestId} ${metadata.type} ${metadata.data} ${JSON.stringify(
        value
      )}`
    );
    return value;
  }
}

```

## Set up logging guards

```ts
// logger/logger.guard.ts

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import logger from './logger';


@Injectable()
export class LoggingGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const message = request.headers['message'];
    logger.log(`Message: ${message}`);
    return true;
  }
}
```

## Set up logging decorators

```ts
// logger/logger.decorator.ts

import { SetMetadata } from '@nestjs/common';

export const Logging = (message: string) => SetMetadata('message', message);
```

## create a logger module

```ts
// logger/logger.module.ts

import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './logger.interceptor';
import { LoggingPipe } from './logger.pipe';
import { LoggingGuard } from './logger.guard';
import { LoggerMiddleware } from './logger.middleware';
import { AllExceptionsFilter } from './logger.filter';

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    LoggingPipe,
    LoggingGuard,
    LoggerMiddleware,
    AllExceptionsFilter,
  ],
  exports: [LoggingPipe, LoggingGuard, LoggerMiddleware, AllExceptionsFilter],
})
export class LoggerModule {}
```
