import { ApiProperty } from '@nestjs/swagger';
import { IsString } from "class-validator";

export class CreateCardDto {
  @IsString({ message: 'Должно быть строкой' })
  @ApiProperty({ example: 'My first card', description: 'Card name' })
  readonly name: string;
}
