import { ApiProperty } from '@nestjs/swagger';
import { Prisma, User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class PatientEntity implements User {
  constructor(partial: Partial<PatientEntity>) {
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
  role: 'PATIENT';

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
  consultationPatient: Prisma.ConsultationCreateInput[];
}
