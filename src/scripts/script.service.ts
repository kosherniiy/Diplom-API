import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateScriptDto } from './create-script.dto';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class ScriptService {
  private readonly scriptsDir = path.join(process.cwd(), '_scripts');

  constructor(private prisma: PrismaService) {
    // Создаем директорию scripts/, если она не существует
    this.ensureScriptsDirectory();
  }

  private async ensureScriptsDirectory() {
    try {
      await fs.mkdir(this.scriptsDir, { recursive: true });
    } catch (error) {
      throw new InternalServerErrorException('Не удалось создать директорию для скриптов');
    }
  }

  async createScript(dto: CreateScriptDto & { sourceCode: string }) {

    // Создаем скрипт с параметрами и зависимостями
    const script = await this.prisma.script.create({
      data: {
        name: dto.name,
        parameters: {
          create: dto.parameters.map(param => ({
            name: param.name,
            type: param.type,
          })),
        },
      },
      include: {
        parameters: true,
      },
    });

    // Сохраняем sourceCode в файл
    const filePath = path.join(this.scriptsDir, `${script.name}.txt`);
    try {
      await fs.writeFile(filePath, dto.sourceCode, 'utf-8');
    } catch (error) {
      console.error(`Ошибка при сохранении файла скрипта ${script.name}:`, error);
      throw new InternalServerErrorException(`Не удалось сохранить файл скрипта: ${error.message}`);
    }

    return script;
  }
}