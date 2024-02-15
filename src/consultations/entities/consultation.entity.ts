import { Consultation, statusConsultation } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/users/entities/user.entity';
export class ConsultationEntity implements Consultation {
  @ApiProperty()
  id: string;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  idMedecin: string | null;

  @ApiProperty({ required: false, type: UserEntity })
  medecin?: UserEntity;

  @ApiProperty()
  idPatient: string;

  @ApiProperty({ required: false, type: UserEntity })
  patient?: UserEntity;

  @ApiProperty()
  criticity: number;

  @ApiProperty()
  status: statusConsultation;

  @ApiProperty()
  informations: string;

  @ApiProperty()
  resultat: string;

  constructor({ medecin, patient, ...data }: Partial<ConsultationEntity>) {
    Object.assign(this, data);

    if (medecin) {
      this.medecin = new UserEntity(medecin);
    }

    if (patient) {
      this.patient = new UserEntity(patient);
    }
  }
}
