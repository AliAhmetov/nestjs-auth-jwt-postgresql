import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { TrelloColumn } from '../columns/columns.model';
import { User } from '../users/users.model';
import { Card } from '../cards/cards.model';
import { TrelloComment } from './comments.model';
import { AuthModule } from '../auth/auth.module';
import { CardsModule } from '../cards/cards.module';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  imports: [
    SequelizeModule.forFeature([TrelloComment, Card]),
    AuthModule,
    CardsModule,
  ],
})
export class CommentsModule {}
