import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import axios from 'axios';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post("")
  async sendHello(@Body("code") code) {

    const newCode = `${code}\nconsole.clear()\nreturn foo(5)==25`

    const body = {
      source_code: newCode,
      language_id: 63 // js,
    }
    const { data: { token } } = await axios.post("http://localhost:2358/submissions/", body)
    return token
  }

  @Get('check')
  async checkFunction(@Body('code') userCode) {
    const judge0Url = 'http://localhost:2358/submissions?base64_encoded=false';

    // Тестовый код, который вызывает функцию foo и возвращает результат
    const testCode = `

    let consoleOutput = [];
    const originalConsoleLog = console.log;
    console.log = (...args) => {
        consoleOutput.push(args.join(' '));
    };

  ${userCode}

  try {
    const result = foo(5);
    originalConsoleLog(JSON.stringify({ result }));
  } catch (e) {
    originalConsoleLog(JSON.stringify({ error: e.message }));
  }
  `;

    try {
      // Отправка задачи в Judge0
      const submissionResponse = await axios.post(judge0Url, {
        source_code: testCode,
        language_id: 63, // JavaScript (Node.js 12.14.0)
      }, {
        headers: { 'Content-Type': 'application/json' },
      });

      const token = submissionResponse.data.token;

      // Polling для ожидания результата
      let result;
      do {
        try {
          const response = await axios.get(`http://localhost:2358/submissions/${token}?base64_encoded=false`);
          result = response.data;
          if (result.status.id > 2) break; // Завершённые статусы
          await new Promise(resolve => setTimeout(resolve, 500)); // Ждём 0.5 сек
        } catch (e) { }
      } while (true);

      // Проверка результата
      if (result.status.id !== 3) {
        return {
          correct: false,
          message: 'Function foo failed to execute.',
          details: {
            status: result.status.description,
            stdout: result.stdout,
            stderr: result.stderr,
            compile_output: result.compile_output,
          },
        };
      }

      console.log(result)

      // Парсинг результата
      try {
        const output = JSON.parse(result.stdout);
        if (output.error) {
          return {
            correct: false,
            message: 'Function foo threw an error.',
            details: { error: output.error },
          };
        }

        const expectedOutput = 25;
        if (output.result === expectedOutput) {
          return { correct: true, message: 'Function foo is correct!' };
        } else {
          return {
            correct: false,
            message: 'Function foo is incorrect.',
            details: {
              actual: output.result,
              expected: expectedOutput,
              stdout: result.stdout,
              stderr: result.stderr,
            },
          };
        }
      } catch (e) {
        return {
          correct: false,
          message: 'Invalid output format.',
          details: { stdout: result.stdout, error: e.message },
        };
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
}