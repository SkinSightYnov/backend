import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: false, default: 'PATIENT' })
  role: 'PATIENT' | 'MEDECIN' | 'DERMATOLOGUE';

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: 'M' })
  sexe: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty()
  password: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  rppsNumber?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  zipCode?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  secuNumber?: string;
}
