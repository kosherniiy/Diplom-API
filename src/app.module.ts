// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ScriptModule } from './scripts/script.module';
import { TemplateModule } from './templates/template.module';
import { TaskModule } from './task/task.module';
import { TestCaseModule } from './testcases/testcase.module';
import { SolveModule } from './solve/solve.module';

@Module({
  imports: [PrismaModule, ScriptModule, UsersModule, AuthModule, TemplateModule, TaskModule, TestCaseModule, SolveModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }