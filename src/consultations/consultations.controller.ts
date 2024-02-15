import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ConsultationsService } from './consultations.service';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ConsultationEntity } from './entities/consultation.entity';

@Controller('consultations')
@ApiTags('consultations')
export class ConsultationsController {
  constructor(private readonly consultationsService: ConsultationsService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ type: ConsultationEntity })
  async create(@Body() createConsultationDto: CreateConsultationDto) {
    return new ConsultationEntity(
      await this.consultationsService.create(createConsultationDto),
    );
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: ConsultationEntity, isArray: true })
  async findAll() {
    const consultations = await this.consultationsService.findAll();
    return consultations.map(
      (consultation) => new ConsultationEntity(consultation),
    );
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ConsultationEntity })
  async findOne(@Param('id', ParseIntPipe) id: string) {
    return new ConsultationEntity(await this.consultationsService.findOne(id));
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ConsultationEntity })
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateConsultationDto: UpdateConsultationDto,
  ) {
    return new ConsultationEntity(
      await this.consultationsService.update(id, updateConsultationDto),
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ConsultationEntity })
  async remove(@Param('id') id: string) {
    return new ConsultationEntity(await this.consultationsService.remove(id));
  }
}
