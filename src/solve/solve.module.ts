import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { SolveService } from './solve.service';
import { SolveController } from './solve.controller';

@Module({
  imports: [PrismaModule],
  controllers: [SolveController],
  providers: [SolveService, PrismaService],
  exports: [SolveService]
})
export class SolveModule { }