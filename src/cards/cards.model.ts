import { BelongsTo, ForeignKey, Model } from 'sequelize-typescript';
import { Column, DataType, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/users.model';
import { TrelloColumn } from '../columns/columns.model';

interface CardCreationAttr {
  name: string;
  column_id: number;
}

@Table({ tableName: 'cards' })
export class Card extends Model<Card, CardCreationAttr> {
  @ApiProperty({ example: 1, description: 'id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({ example: 'My card', description: 'Name of card' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @ForeignKey(() => TrelloColumn)
  @Column({ type: DataType.INTEGER, allowNull: false })
  column_id: number;

  @BelongsTo(() => TrelloColumn)
  column: TrelloColumn;
}
