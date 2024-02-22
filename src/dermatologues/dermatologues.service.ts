import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DermatologuesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.user.findMany({
      where: {
        role: 'DERMATOLOGUE',
      },
    });
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
        role: 'DERMATOLOGUE',
      },
    });
  }

  getAppointmentByDermatologueId(dermatologueId: string) {
    return this.prisma.appointment.findMany({
      where: {
        idDermatologue: dermatologueId,
      },
    });
  }

  // changeAppointmentStatus(appointmentId: string, status: statusAppointment) {
  //   return this.prisma.appointment.update({
  //     where: {
  //       id: appointmentId,
  //     },
  //     data: {
  //       status: statusAppointment,
  //     },
  //   });
  // }
}
