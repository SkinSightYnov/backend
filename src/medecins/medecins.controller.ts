import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  HttpException,
} from '@nestjs/common';
import { MedecinsService } from './medecins.service';
import { ConsultationsService } from 'src/consultations/consultations.service';
import { updateConsultationStatusDto } from './dto/update-consultation-status.dto';
import { ApiTags } from '@nestjs/swagger';
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
  getConsultationsByDoctorId(@Param('id') id: string) {
    return this.medecinsService.getConsultationsByDoctorId(id);
  }

  @Patch(':id/consultations/:idConsultation/update-status')
  async updateConsultationStatus(
    @Param('id') id: string,
    @Param('idConsultation') idConsultation: string,
    @Body() updateConsultationStatusDto: updateConsultationStatusDto,
  ) {
    const consultation =
      await this.consultationsService.findOne(idConsultation);
    if (consultation.idMedecin !== id) {
      throw new HttpException('User not found', 404);
    }

    if (consultation.id !== idConsultation) {
      throw new HttpException('Consultation not found', 404);
    }

    // if(consultation.status === "")

    return this.consultationsService.update(idConsultation, {
      status: updateConsultationStatusDto.status,
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
