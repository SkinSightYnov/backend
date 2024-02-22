import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Appointment } from '@prisma/client';

@Injectable()
export class AppointmentsService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createAppointmentDto: CreateAppointmentDto) {
    this.prismaService.appointment.create({
      data: createAppointmentDto as Appointment,
    });
  }

  findByPatientId(patientId: string) {
    return this.prismaService.appointment.findMany({
      where: {
        idPatient: patientId,
      },
    });
  }

  findByDermatologueId(dermatologueId: string) {
    return this.prismaService.appointment.findMany({
      where: {
        idDermatologue: dermatologueId,
      },
    });
  }

  findAll() {
    return this.prismaService.appointment.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} appointment`;
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return `This action updates a #${id} appointment`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }
}
