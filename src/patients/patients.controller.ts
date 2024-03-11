import {
  Controller,
  Get,
  Param,
  UseGuards,
  Req,
  HttpException,
} from '@nestjs/common';
import { PatientsService } from './patients.service';
import { ConsultationsService } from 'src/consultations/consultations.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { User } from '@prisma/client';
import { RolesGuard } from 'src/auth/roles.guard';
import { HasRole } from 'src/auth/has-role.decorator';
import { ConsultationEntity } from 'src/consultations/entities/consultation.entity';
import { PatientEntity } from './entities/patient.entity';

@Controller('patients')
@ApiTags('patients')
export class PatientsController {
  constructor(
    private readonly patientsService: PatientsService,
    private readonly consultationService: ConsultationsService,
  ) {}

  @Get()
  @ApiOkResponse({ type: PatientEntity, isArray: true })
  findAll() {
    return this.patientsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: PatientEntity })
  findOne(@Param('id') id: string) {
    return this.patientsService.findOne(id);
  }

  @ApiBearerAuth()
  @HasRole('PATIENT', 'ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOkResponse({ type: ConsultationEntity, isArray: true })
  @Get(':id/consultations')
  getConsultationsByPatientId(@Param('id') id: string) {
    return this.consultationService.getConsultationsByPatientId(id);
  }

  @ApiBearerAuth()
  @HasRole('PATIENT', 'ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id/consultations/:idConsultation')
  @ApiOkResponse({ type: ConsultationEntity })
  async getConsultationByPatientId(
    @Param('id') id: string,
    @Param('idConsultation') idConsultation: string,
    @Req() req: Request,
  ) {
    const userJwt = req.user as User;
    if (userJwt.id !== id) {
      throw new HttpException('Unauthorized', 401);
    }

    const consultation = await this.consultationService.findOne(idConsultation);
    if (consultation.idPatient !== userJwt.id) {
      throw new HttpException('Unauthorized', 401);
    }

    return consultation;
  }
}
