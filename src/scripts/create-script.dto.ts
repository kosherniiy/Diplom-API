import { IsString, IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ParameterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  type: string;
}

export class CreateScriptDto {
  @IsArray()
  @IsString({ each: true })
  dependencies: string[];

  @IsString()
  @IsNotEmpty()
  sourceCode: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ParameterDto)
  parameters: ParameterDto[];
}