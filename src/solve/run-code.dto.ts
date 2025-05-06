import { IsNumber, IsString } from 'class-validator';

export class RunCodeDto {
  @IsString()
  code: string

  @IsString()
  functionName?: string

  functionParams: any
}