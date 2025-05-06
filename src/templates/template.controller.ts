import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TemplateService } from './template.service';
import { CreateTemplateDto } from './create-template.dto';

@Controller('templates')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) { }

  @Post("")
  create(@Body() createTemplateDto: CreateTemplateDto) {
    return this.templateService.create(createTemplateDto);
  }
}