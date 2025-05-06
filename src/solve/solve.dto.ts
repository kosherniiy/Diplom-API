import { IsNumber, IsString } from 'class-validator';

export class SolveDto {
  @IsString()
  sourceCode: string

  @IsNumber()
  taskId: number
}