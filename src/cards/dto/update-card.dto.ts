import { ApiProperty } from '@nestjs/swagger';
import { IsString } from "class-validator";

export class UpdateCardDto {
  @IsString({ message: 'Должно быть строкой' })
  @ApiProperty({
    example: 'My first card changed',
    description: 'New card name',
  })
  readonly name: string;
}
