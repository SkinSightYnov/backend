import { Module } from '@nestjs/common';
import { MedecinsService } from './medecins.service';
import { MedecinsController } from './medecins.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConsultationsService } from 'src/consultations/consultations.service';

@Module({
  controllers: [MedecinsController],
  imports: [PrismaModule],
  providers: [MedecinsService, ConsultationsService],
  exports: [MedecinsService],
})
export class MedecinsModule {}
