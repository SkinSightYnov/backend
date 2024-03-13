import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PatientsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return await this.prismaService.user.findMany({
      where: {
        role: 'PATIENT',
      },
    });
  }

  findOne(id: string) {
    return this.prismaService.user.findUnique({
      where: {
        id,
        role: 'PATIENT',
      },
    });
  }

  async getAppointmentsByPatientId(patientId: string) {
    return await this.prismaService.appointment.findMany({
      where: {
        idPatient: patientId,
      },
    });
  }
}
