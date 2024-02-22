import { Injectable } from '@nestjs/common';
import { ConsultationsService } from 'src/consultations/consultations.service';
// import { CreateMedecinDto } from './dto/create-medecin.dto';
// import { UpdateMedecinDto } from './dto/update-medecin.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MedecinsService {
  constructor(
    private prisma: PrismaService,
    private consultationService: ConsultationsService,
  ) {}

  async findAll() {
    return this.prisma.user
      .findMany({
        where: {
          role: 'MEDECIN',
        },
      })
      .then((medecins) => {
        return medecins.map((medecin) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { password, ...medecinWithoutPassword } = medecin;
          return medecinWithoutPassword;
        });
      });
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
        role: 'MEDECIN',
      },
    });
  }

  getConsultationsByDoctorId(doctorId: string) {
    return this.consultationService.getConsultationsByDoctorId(doctorId);
  }

  // update(id: number, updateMedecinDto: UpdateMedecinDto) {
  //   return `This action updates a #${id} medecin`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} medecin`;
  // }
}
