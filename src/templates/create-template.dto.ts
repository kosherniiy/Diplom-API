import { IsString, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTemplateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  scripts?: string[];
}