import { Module } from '@nestjs/common';
import { ColumnsController } from './columns.controller';
import { ColumnsService } from './columns.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { TrelloColumn } from './columns.model';
import { User } from '../users/users.model';
import { Card } from '../cards/cards.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [ColumnsController],
  providers: [ColumnsService],
  imports: [SequelizeModule.forFeature([TrelloColumn, User, Card])],
})
export class ColumnsModule {}
