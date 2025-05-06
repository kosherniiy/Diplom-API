import { Module } from '@nestjs/common';
import { TestCaseService } from './testcase.service';
import { TestCaseController } from './testcase.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [PrismaModule],
  controllers: [TestCaseController],
  providers: [TestCaseService, PrismaService],
  exports: [TestCaseService]
})
export class TestCaseModule { }