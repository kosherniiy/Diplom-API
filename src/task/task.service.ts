import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './create-task.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) { }

  async create(createTaskDto: CreateTaskDto) {
    // Подготовка данных для создания задачи
    const taskData: any = {
      instructions: createTaskDto.instructions,
    };

    // Если указано имя шаблона, добавляем связь
    if (createTaskDto.templateName) {
      // Проверяем существование шаблона
      const templateExists = await this.prisma.template.findUnique({
        where: { name: createTaskDto.templateName },
        select: { name: true }
      });

      if (!templateExists) {
        throw new NotFoundException(
          `Шаблон с именем '${createTaskDto.templateName}' не найден`
        );
      }

      taskData.template = { connect: { name: createTaskDto.templateName } };
    }

    return this.prisma.task.create({
      data: {
        name: createTaskDto.name,
        ...taskData
      },
      include: {
        template: {
          include: {
            scripts: {
              include: {
                script: true
              },
              orderBy: { order: 'asc' }
            }
          }
        }
      }
    });
  }
}