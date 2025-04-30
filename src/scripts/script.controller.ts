import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ScriptService } from './script.service';
import { CreateScriptDto } from './create-script.dto';

@Controller('scripts')
export class ScriptController {
  constructor(private scriptService: ScriptService) { }

  @Post("")
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createScriptDto: CreateScriptDto) {
    const script = await this.scriptService.createScript(createScriptDto);
    return {
      message: 'Скрипт успешно создан',
      data: script,
    };
  }
}