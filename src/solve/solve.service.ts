import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SolveDto } from './solve.dto';
import { join } from 'path';
import { VM } from 'vm2';
import { promises as fs } from 'fs';
import axios from 'axios';

// Whitelist разрешенных URL и методов
const ALLOWED_ENDPOINTS = [
  {
    method: 'POST', // Разрешаем только POST
    url: 'http://localhost:3000/solve/run' // Точный URL
  }
];

@Injectable()
export class SolveService {
  constructor(private prisma: PrismaService) { }

  async solve(dto: SolveDto) {
    const task = await this.prisma.task.findUnique({
      where: { id: dto.taskId },
      include: {
        template: {
          include: {
            scripts: {
              include: {
                script: {
                  include: {
                    parameters: true // Получаем параметры скрипта
                  }
                }
              },
              orderBy: { order: 'asc' }
            }
          }
        },
        testCases: {
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
            },
          }
        }
      }
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${dto.taskId} not found`);
    }

    if (!task.template) {
      throw new Error('Task has no template assigned');
    }

    const vm = new VM({
      sandbox: {
        setTimeout,
        safeFetch: this.safeFetch, // Даем доступ только к этой функции
        runCode: async ({ code, functionParams, functionName }) => await this.safeFetch('http://localhost:3000/solve/run', {
          method: 'POST',
          body: JSON.stringify({
            code,
            functionParams,
            functionName
          })
        })
      },
    });

    // выполнение скриптов
    for (const testCase of task.testCases) {
      for (const templateScript of task.template.scripts) {

        const options = {
          common: {
            code: dto.sourceCode
          },
          params: this.aggregateParameters(testCase, templateScript.script.parameters)
        }

        console.log(options)
        const { name } = templateScript.script

        const invokeMain = () => `main(${JSON.stringify(options)})`

        const filePath = join(__dirname, '..', '..', '_scripts', name + '.txt');
        const content = await fs.readFile(filePath, 'utf-8');

        const result = await vm.run(content + invokeMain());
        console.log('@', result)
        if (!result.passed) return false
      }
    }

    return true
  }

  private aggregateParameters(testCase: any, scriptParameters: any[]) {
    const params = {};

    // Обрабатываем Value параметры
    testCase.valueParameters.forEach(vp => {
      const paramDef = scriptParameters.find(p => p.id === vp.parameterId);
      if (paramDef) {
        params[paramDef.name] = vp.value;
      }
    });

    // Обрабатываем Object параметры
    testCase.objectParameters.forEach(op => {
      const paramDef = scriptParameters.find(p => p.id === op.parameterId);
      if (paramDef) {
        if (!params[paramDef.name]) {
          params[paramDef.name] = {};
        }
        params[paramDef.name][op.key] = op.value;
      }
    });

    return params;
  }


  async safeFetch(url: string, options: { method?: string, body?: any }) {
    // Проверяем, что URL и метод есть в whitelist
    const isAllowed = ALLOWED_ENDPOINTS.some(
      endpoint =>
        url === endpoint.url &&
        (!options.method || options.method === endpoint.method)
    );

    if (!isAllowed) {
      throw new Error(`Запрос ${options.method || 'GET'} ${url} запрещен!`);
    }

    // Делаем запрос через axios
    const response = await axios({
      url,
      method: options?.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      data: options?.body
    });
    return response.data;
  };
}