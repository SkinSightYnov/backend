import {
  Controller,
  Get,
  Param,
  UseGuards,
  Req,
  HttpException,
  Post,
} from '@nestjs/common';
import { PatientsService } from './patients.service';
import { ConsultationsService } from 'src/consultations/consultations.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { Request } from 'express';
import { User } from '@prisma/client';
import { RolesGuard } from 'src/auth/roles.guard';
import { HasRole } from 'src/auth/has-role.decorator';
import { ConsultationEntity } from 'src/consultations/entities/consultation.entity';

@Controller('patients')
export class PatientsController {
  constructor(
    private readonly patientsService: PatientsService,
    private readonly consultationService: ConsultationsService,
  ) {}

  @Get()
  findAll() {
    return this.patientsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientsService.findOne(+id);
  }

  @ApiBearerAuth()
  @HasRole('PATIENT', 'ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
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

  // @Get()
  // findAll() {
  //   return this.patientsService.findAll();
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
  //   return this.patientsService.update(+id, updatePatientDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.patientsService.remove(+id);
  // }
}