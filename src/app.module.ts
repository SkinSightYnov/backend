import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './prisma/health/health.module';
import { LoggerModule } from './logger/logger.module';
import { MetricModule } from './metric/metric.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './logger/logger.interceptor';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConsultationsModule } from './consultations/consultations.module';
import { MedecinsModule } from './medecins/medecins.module';

@Module({
  imports: [
    UsersModule,
    HealthModule,
    LoggerModule,
    MetricModule,
    ConfigModule.forRoot(),
    AuthModule,
    UsersModule,
    PrismaModule,
    ConsultationsModule,
    MedecinsModule,
  ],
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
