import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TestCaseService } from './testcase.service';
import { CreateTestCaseDto } from './create-test-case.dto';

@Controller('testcases')
export class TestCaseController {
  constructor(private readonly testCaseService: TestCaseService) { }

  @Post()
  create(@Body() createTestCaseDto: CreateTestCaseDto) {
    return this.testCaseService.create(createTestCaseDto);
  }
}