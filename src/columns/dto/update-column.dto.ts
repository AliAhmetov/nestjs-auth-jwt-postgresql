import { ApiProperty } from '@nestjs/swagger';
import { IsString } from "class-validator";

export class UpdateColumnDto {
  @IsString({ message: 'Должно быть строкой' })
  @ApiProperty({ example: 'My changed column', description: 'New column name' })
  readonly name: string;
}
