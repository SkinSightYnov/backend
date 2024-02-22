import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConsultationsService } from 'src/consultations/consultations.service';

@Module({
  imports: [PrismaModule],
  controllers: [PatientsController],
  providers: [PatientsService, ConsultationsService],
  exports: [PatientsService],
})
export class PatientsModule {}
