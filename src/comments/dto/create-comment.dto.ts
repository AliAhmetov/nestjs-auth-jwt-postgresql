import { ApiProperty } from '@nestjs/swagger';
import { IsString } from "class-validator";

export class CreateCommentDto {
  @IsString({ message: 'Должно быть строкой' })
  @ApiProperty({ example: 'this is comment for card', description: 'Comment' })
  readonly comment: string;
}
