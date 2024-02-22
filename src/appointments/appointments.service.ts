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

  // updateStatus(appointmentId: string, status: App) {

  findAll() {
    return this.prismaService.appointment.findMany();
  }

  findOne(id: string) {
    return this.prismaService.appointment.findUnique({
      where: {
        id: id,
      },
    });
  }

  update(id: string, updateAppointmentDto: UpdateAppointmentDto) {
    return this.prismaService.appointment.update({
      where: {
        id: id,
      },
      data: updateAppointmentDto as Appointment,
    });
  }

  remove(id: string) {
    return this.prismaService.appointment.delete({
      where: {
        id: id,
      },
    });
  }
}
