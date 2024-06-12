import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/common/service/prisma.service';
import { ValidationService } from 'src/common/service/validation.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, ValidationService],
  exports: [UserService],
})

export class UserModule {}
