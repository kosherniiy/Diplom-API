import { Controller, Post, HttpCode, HttpStatus, UseInterceptors, UploadedFile, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs/promises';
import { CreateScriptDto } from './create-script.dto';
import { ScriptService } from './script.service';

@Controller('scripts')
export class ScriptController {
  constructor(private readonly scriptService: ScriptService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createScriptDto: CreateScriptDto
  ) {
    // Создаем скрипт
    const script = await this.scriptService.createScript(createScriptDto);

    return {
      message: 'Скрипт успешно создан',
      data: script,
    };
  }
}