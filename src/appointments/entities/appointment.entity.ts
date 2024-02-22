import { ApiProperty } from '@nestjs/swagger';
import { Appointment, statusAppointment } from '@prisma/client';

export class AppointmentEntity implements Appointment {
  @ApiProperty()
  id: string;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  idDermatologue: string;

  @ApiProperty()
  idPatient: string;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  status: statusAppointment;

  @ApiProperty()
  idConsultation: string;
}
