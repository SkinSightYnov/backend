import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DermatologuesService } from './dermatologues.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('dermatologues')
@Controller('dermatologues')
export class DermatologuesController {
  constructor(private readonly dermatologuesService: DermatologuesService) {}

  @Get()
  findAll() {
    return this.dermatologuesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dermatologuesService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDermatologueDto: ) {
  //   return this.dermatologuesService.update(+id, updateDermatologueDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.dermatologuesService.remove(+id);
  // }
}
