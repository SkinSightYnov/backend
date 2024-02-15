import { ApiProperty } from '@nestjs/swagger';
import { statusConsultation } from '@prisma/client';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateConsultationDto {
  @IsEnum(statusConsultation)
  @IsOptional()
  @ApiProperty({
    enum: statusConsultation,
    default: statusConsultation.WAITING,
  })
  status: statusConsultation;

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false, default: 0 })
  criticity?: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  idPatient: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  idMedecin: string;

  @ApiProperty()
  @IsOptional()
  informations?: string;

  @ApiProperty()
  @IsOptional()
  resultat?: string;
}
