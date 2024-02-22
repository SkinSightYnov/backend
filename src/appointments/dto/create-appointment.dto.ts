import { ApiProperty } from '@nestjs/swagger';
import { statusAppointment } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAppointmentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  idDermatologue: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  idPatient: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @ApiProperty({ enum: statusAppointment, default: statusAppointment.WAITING })
  @IsOptional()
  @IsEnum(statusAppointment)
  status: statusAppointment;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  idConsultation: string;
}
