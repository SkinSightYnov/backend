import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class updateResultatConsultationDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  resultat: string;
}
