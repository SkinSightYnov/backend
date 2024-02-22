import { PartialType } from '@nestjs/swagger';
import { CreateDermatologueDto } from './create-dermatologue.dto';

export class UpdateDermatologueDto extends PartialType(CreateDermatologueDto) {}
