import { Module } from '@nestjs/common';
import { PinjamController } from './pinjam.controller';
import { PinjamService } from './pinjam.service';
import { PrismaService } from 'src/common/service/prisma.service';
import { ValidationService } from 'src/common/service/validation.service';


@Module({
  providers: [PinjamService, PrismaService, ValidationService],
  controllers: [PinjamController],
})

export class PinjamModule {}
