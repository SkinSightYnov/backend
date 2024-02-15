import { Module } from '@nestjs/common';
import { ConsultationsService } from './consultations.service';
import { ConsultationsController } from './consultations.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ConsultationsController],
  providers: [ConsultationsService],
  imports: [PrismaModule],
  exports: [ConsultationsService],
})
export class ConsultationsModule {}
