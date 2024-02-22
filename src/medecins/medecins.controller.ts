import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  HttpException,
  Req,
  UseGuards,
} from '@nestjs/common';
import { MedecinsService } from './medecins.service';
import { ConsultationsService } from 'src/consultations/consultations.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role, User, statusConsultation } from '@prisma/client';
import { updateResultatConsultationDto } from './dto/update-resultat-consultation.dto';
import { updateConsultationStatusDto } from './dto/update-consultation-status.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { HasRole } from 'src/auth/has-role.decorator';
// import { CreateMedecinDto } from './dto/create-medecin.dto';
// import { UpdateMedecinDto } from './dto/update-medecin.dto';

@Controller('medecins')
@ApiTags('medecins')
export class MedecinsController {
  constructor(
    private readonly medecinsService: MedecinsService,
    private readonly consultationsService: ConsultationsService,
  ) {}

  // @Post()
  // create(@Body() createMedecinDto: CreateMedecinDto) {
  //   return this.medecinsService.create(createMedecinDto);
  // }

  @Get()
  async findAll() {
    return this.medecinsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medecinsService.findOne(id);
  }

  @Get(':id/consultations')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HasRole(Role.MEDECIN)
  @ApiBearerAuth()
  getConsultationsByDoctorId(@Param('id') id: string) {
    return this.medecinsService.getConsultationsByDoctorId(id);
  }

  @Patch(':id/consultations/:idConsultation/update-status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HasRole(Role.MEDECIN)
  @ApiBearerAuth()
  async updateConsultationStatus(
    @Param('id') id: string,
    @Param('idConsultation') idConsultation: string,
    @Body() updateConsultationStatus: updateConsultationStatusDto,
  ) {
    const consultation =
      await this.consultationsService.findOne(idConsultation);
    if (consultation.idMedecin !== id) {
      throw new HttpException('User not found', 404);
    }

    if (consultation.id !== idConsultation) {
      throw new HttpException('Consultation not found', 404);
    }

    if (
      consultation.status === statusConsultation.CLOSED ||
      consultation.status === statusConsultation.CANCELED
    ) {
      throw new HttpException('Consultation is closed or canceled', 404);
    }

    return this.consultationsService.update(idConsultation, {
      status: updateConsultationStatus.status,
    });
  }

  @Patch(':id/consultations/:idConsultation/update-resultat')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HasRole(Role.MEDECIN)
  @ApiBearerAuth()
  async updateConsultationResultat(
    @Param('id') id: string,
    @Param('idConsultation') idConsultation: string,
    @Req() req: Request,
    @Body() updateResultatConsultation: updateResultatConsultationDto,
  ) {
    // extract the id of the jwt with passeport
    const user = req.user as User;
    // return idJwt;

    const consultation =
      await this.consultationsService.findOne(idConsultation);

    if (consultation.idMedecin !== user.id && user.id !== id) {
      throw new HttpException('User not found', 404);
    }

    if (consultation.id !== idConsultation) {
      throw new HttpException('Consultation not found', 404);
    }

    if (
      consultation.status === statusConsultation.CLOSED ||
      consultation.status === statusConsultation.CANCELED
    ) {
      throw new HttpException('Consultation is closed or canceled', 404);
    }

    return this.consultationsService.update(idConsultation, {
      resultat: updateResultatConsultation.resultat,
    });
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMedecinDto: UpdateMedecinDto) {
  //   return this.medecinsService.update(+id, updateMedecinDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.medecinsService.remove(+id);
  // }
}
