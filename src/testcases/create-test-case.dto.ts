import { Type } from 'class-transformer';
import { IsString, IsInt, IsNotEmpty, IsObject, ValidateNested } from 'class-validator';

class TestCaseParameters {
  [key: string]: any;
}

export class CreateTestCaseDto {
  @IsInt()
  @IsNotEmpty()
  taskId: number;

  @IsObject()
  @ValidateNested()
  @Type(() => TestCaseParameters)
  parameters: Record<string, any>;
}