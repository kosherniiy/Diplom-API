import { IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  name: string

  @IsString()
  instructions: string;

  @IsString()
  templateName: string
}