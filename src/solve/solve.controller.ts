import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SolveService } from './solve.service';
import { SolveDto } from './solve.dto';
import { VM } from 'vm2';
import { RunCodeDto } from './run-code.dto';

@Controller('solve')
export class SolveController {
  constructor(private readonly taskService: SolveService) { }

  @Post("")
  solve(@Body() solveDto: SolveDto) {
    return this.taskService.solve(solveDto);
  }

  @Post('run')
  async runCode(@Body() body: RunCodeDto) {
    const { code, functionParams, functionName } = body

    const invokeCode = `${functionName}(${JSON.stringify(functionParams)})`
    const newCode = code + invokeCode
    return {
      result: await new VM().run(newCode)
    };
  }
}