import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTemplateDto } from './create-template.dto';

@Injectable()
export class TemplateService {
  constructor(private prisma: PrismaService) { }

  async create(createTemplateDto: CreateTemplateDto) {
    const { scripts, ...templateData } = createTemplateDto;

    return this.prisma.template.create({
      data: {
        ...templateData,
        scripts: {
          create: scripts.map((scriptName, index) => ({
            scriptName,
            order: index + 1, // Автоматическая нумерация по порядку
          })),
        },
      },
      include: {
        scripts: {
          include: {
            script: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
    });
  }
}