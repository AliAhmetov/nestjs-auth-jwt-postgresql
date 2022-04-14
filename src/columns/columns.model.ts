import { BelongsTo, ForeignKey, HasMany, Model } from 'sequelize-typescript';
import { Column, DataType, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/users.model';
import { Card } from '../cards/cards.model';

interface ColumnCreationAttr {
  name: string;
  user_id: number;
}

@Table({ tableName: 'columns' })
export class TrelloColumn extends Model<TrelloColumn, ColumnCreationAttr> {
  @ApiProperty({ example: 1, description: 'id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({ example: 'To Do', description: 'Name of column' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  user_id: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Card)
  cards: Card[];
}
