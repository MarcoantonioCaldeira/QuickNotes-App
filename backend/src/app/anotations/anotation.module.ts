import { Module } from '@nestjs/common';
import { AnotationController } from './anotation.controller';
import { AnotationService } from './anotation.service';
import { PrismaService } from '../../database/PrismaService';



@Module({
  controllers: [AnotationController],
  providers: [AnotationService, PrismaService] 
})

export class AnotationModule {}