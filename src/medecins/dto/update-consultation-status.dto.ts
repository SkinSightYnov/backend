import { ApiProperty } from '@nestjs/swagger';
import { statusConsultation } from '@prisma/client';
import { IsEnum, IsNotEmpty } from 'class-validator';

// const statusConsultationEnum = {
//   WAITING: 'WAITING',
//   INPROGRESS: 'INPROGRESS',
//   TREATED: 'TREATED',
//   CLOSED: 'CLOSED',
//   CANCEL: 'CANCEL',
// };

export class updateConsultationStatusDto {
  @IsEnum(statusConsultation)
  @IsNotEmpty()
  @ApiProperty({
    enum: statusConsultation,
  })
  status: statusConsultation;
}
