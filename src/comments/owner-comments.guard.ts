import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CardsService } from '../cards/cards.service';

@Injectable()
export class OwnerCommentsGuard implements CanActivate {
  constructor(
    private commentsService: CommentsService,
    private cardsService: CardsService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    try {
      const url = req.url;
      const cardId = url.split('/')[2];
      const commentId = url.split('/')[4];

      const comment = await this.commentsService.getCommentById(commentId);

      if (Number(cardId) !== comment.card.id) {
        throw new NotFoundException({ message: 'Не верный адрес' });
      }

      const card = await this.cardsService.getCardById(comment.card.id);

      if (req.user.id !== card.column.user_id) {
        throw new ForbiddenException({ message: 'Отсутствует доступ' });
      }
      return true;
    } catch (e) {
      console.log(e.message, e.name);
      throw e;
    }
  }
}
