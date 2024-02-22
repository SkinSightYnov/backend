import { Controller, Get, Param } from '@nestjs/common';
import { DermatologuesService } from './dermatologues.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { DermatologueEntity } from './entities/dermatologue.entity';

@ApiTags('dermatologues')
@Controller('dermatologues')
export class DermatologuesController {
  constructor(private readonly dermatologuesService: DermatologuesService) {}

  @Get()
  @ApiOkResponse({ type: DermatologueEntity, isArray: true })
  findAll() {
    return this.dermatologuesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: DermatologueEntity })
  findOne(@Param('id') id: string) {
    return this.dermatologuesService.findOne(id);
  }
}
