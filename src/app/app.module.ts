import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { HealthModule } from './health/health.module';
import { LoggerModule } from './logger/logger.module';
import { MetricModule } from './metric/metric.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './logger/logger.interceptor';

@Module({
  imports: [UserModule, HealthModule, LoggerModule, MetricModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
