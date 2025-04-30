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

  async createScript(dto: CreateScriptDto) {
    // Проверяем существование всех зависимых скриптов
    if (dto.dependencies.length > 0) {
      const existingScripts = await this.prisma.script.findMany({
        where: { id: { in: dto.dependencies } },
      });

      if (existingScripts.length !== dto.dependencies.length) {
        throw new NotFoundException('Один или несколько зависимых скриптов не найдены');
      }
    }

    // Создаем скрипт с параметрами и зависимостями
    const script = await this.prisma.script.create({
      data: {
        name: dto.name,
        sourceCode: dto.sourceCode,
        parameters: {
          create: dto.parameters.map(param => ({
            name: param.name,
            type: param.type,
          })),
        },
        dependenciesAsOriginal: {
          create: dto.dependencies.map(depId => ({
            dependantId: depId,
          })),
        },
      },
      include: {
        parameters: true,
        dependenciesAsOriginal: {
          include: { dependant: true },
        },
      },
    });

    // Сохраняем sourceCode в файл
    const filePath = path.join(this.scriptsDir, `${script.id}.txt`);
    try {
      await fs.writeFile(filePath, dto.sourceCode, 'utf-8');
    } catch (error) {
      // Логируем ошибку, но не прерываем создание записи в БД
      console.error(`Ошибка при сохранении файла скрипта ${script.id}:`, error);
      throw new InternalServerErrorException(`Не удалось сохранить файл скрипта: ${error.message}`);
    }

    return script;
  }
}