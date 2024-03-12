import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './prisma/health/health.module';
import { LoggerModule } from './logger/logger.module';
import { MetricModule } from './metric/metric.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './logger/logger.interceptor';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConsultationsModule } from './consultations/consultations.module';
import { MedecinsModule } from './medecins/medecins.module';
import { DermatologuesModule } from './dermatologues/dermatologues.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { PatientsModule } from './patients/patients.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 150,
      },
    ]),
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
    DermatologuesModule,
    AppointmentsModule,
    PatientsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
