import { Injectable } from '@nestjs/common';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ConsultationsService {
  constructor(private prisma: PrismaService) {}

  //@TODO replace any by the correct type
  create(createConsultationDto: CreateConsultationDto) {
    return this.prisma.consultation.create({
      data: createConsultationDto as any,
    });
  }

  findAll() {
    return this.prisma.consultation.findMany();
  }

  findOne(id: string) {
    return this.prisma.consultation.findUnique({ where: { id } });
  }

  update(id: string, updateConsultationDto: UpdateConsultationDto) {
    return this.prisma.consultation.update({
      where: { id },
      data: updateConsultationDto,
    });
  }

  getConsultationsByPatientId(patientId: string) {
    return this.prisma.consultation.findMany({
      where: {
        idPatient: patientId,
      },
    });
  }

  getConsultationsByDoctorId(doctorId: string) {
    return this.prisma.consultation.findMany({
      where: {
        idMedecin: doctorId,
      },
    });
  }

  remove(id: string) {
    return this.prisma.consultation.delete({
      where: { id },
    });
  }
}
