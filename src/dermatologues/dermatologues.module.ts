import { Module } from '@nestjs/common';
import { DermatologuesService } from './dermatologues.service';
import { DermatologuesController } from './dermatologues.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DermatologuesController],
  providers: [DermatologuesService],
  exports: [DermatologuesService],
})
export class DermatologuesModule {}
