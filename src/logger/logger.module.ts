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
