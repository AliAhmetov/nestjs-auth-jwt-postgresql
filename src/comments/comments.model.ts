import { BelongsTo, ForeignKey, HasMany, Model } from 'sequelize-typescript';
import { Column, DataType, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/users.model';
import { Card } from '../cards/cards.model';

interface CommentCreationAttr {
  comment: string;
  card_id: number;
}

@Table({ tableName: 'comments' })
export class TrelloComment extends Model<TrelloComment, CommentCreationAttr> {
  @ApiProperty({ example: 1, description: 'id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({
    example: 'Some comments for card',
    description: 'Comment for card',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  comment: string;

  @ForeignKey(() => Card)
  @Column({ type: DataType.INTEGER, allowNull: false })
  card_id: number;

  @BelongsTo(() => Card)
  card: Card;
}
