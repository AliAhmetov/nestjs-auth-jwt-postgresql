import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CardsService } from './cards.service';

@Injectable()
export class OwnerCardsGuard implements CanActivate {
  constructor(private cardsService: CardsService) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    try {
      const url = req.url;
      const columnId = url.split('/')[2];
      const cardId = url.split('/')[4];

      const card = await this.cardsService.getCardById(cardId);

      if (Number(columnId) !== card.column.id) {
        throw new NotFoundException({ message: 'Не верный адрес' });
      }

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
