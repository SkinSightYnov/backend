import { ApiProperty } from '@nestjs/swagger';
import { Appointment, User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class Medecin implements User {
  constructor(partial: Partial<Medecin>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  role: 'DERMATOLOGUE';

  @ApiProperty()
  email: string;

  @ApiProperty()
  sexe: string;

  @Exclude()
  password: string;

  @ApiProperty()
  rppsNumber: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  zipCode: string;

  @ApiProperty()
  secuNumber: string;

  @ApiProperty()
  appointmentsPatient: Appointment[];
}
