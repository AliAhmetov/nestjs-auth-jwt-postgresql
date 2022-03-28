import { ApiProperty } from '@nestjs/swagger';
import { IsString } from "class-validator";

export class CreateColumnDto {
  @IsString({ message: 'Должно быть строкой' })
  @ApiProperty({ example: 'My column', description: 'Column name' })
  readonly name: string;
}
