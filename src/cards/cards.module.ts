import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { TrelloColumn } from '../columns/columns.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/users.model';
import { Card } from './cards.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [CardsController],
  providers: [CardsService],
  imports: [SequelizeModule.forFeature([TrelloColumn, User, Card]), AuthModule],
  exports: [CardsService],
})
export class CardsModule {}
