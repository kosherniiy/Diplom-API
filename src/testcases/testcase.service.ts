import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTestCaseDto } from './create-test-case.dto';

@Injectable()
export class TestCaseService {
  constructor(private prisma: PrismaService) { }

  async create(createTestCaseDto: CreateTestCaseDto) {
    const { taskId, parameters, ...data } = createTestCaseDto;

    // Проверяем существование задачи
    const taskExists = await this.prisma.task.findUnique({
      where: { id: taskId }
    });

    if (!taskExists) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }

    // Создаем тест-кейс
    return this.prisma.testCase.create({
      data: {
        ...data,
        task: { connect: { id: taskId } },
        valueParameters: {
          create: Object.entries(parameters)
            .filter(([_, value]) => typeof value === 'string')
            .map(([paramId, value]) => ({
              parameter: {
                connectOrCreate: {
                  where: { id: paramId },
                  create: {
                    id: paramId,
                    name: `Generated-${paramId}`,
                    type: 'VALUE',
                    script: { connect: { name: 'default' } }
                  }
                }
              },
              value: value as string
            }))
        },
        objectParameters: {
          create: Object.entries(parameters)
            .filter(([_, value]) => typeof value === 'object')
            .map(([paramId, obj]) => ({
              parameter: {
                connectOrCreate: {
                  where: { id: paramId },
                  create: {
                    id: paramId,
                    name: `Generated-${paramId}`,
                    type: 'OBJECT',
                    script: { connect: { name: 'default' } }
                  }
                }
              },
              key: (obj as any).key,
              value: (obj as any).value
            }))
        }
      },
      include: {
        valueParameters: {
          include: {
            parameter: true
          }
        },
        objectParameters: {
          include: {
            parameter: true
          }
        }
      }
    });
  }
}