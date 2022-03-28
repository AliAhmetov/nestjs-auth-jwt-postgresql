import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Card } from './cards.model';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Injectable()
export class CardsService {
  constructor(@InjectModel(Card) private cardRepository: typeof Card) {}

  async createCard(columnId: number, dto: CreateCardDto) {
    const card = await this.cardRepository.create({
      ...dto,
      column_id: columnId,
    });
    return card;
  }

  async getCardById(id: number) {
    const card = await this.cardRepository.findOne({
      include: { all: true },
      where: { id },
    });
    return card;
  }

  async deleteCard(id: number) {
    await this.cardRepository.destroy({ where: { id } });
  }

  async updateCard(id: number, dto: UpdateCardDto) {
    await this.cardRepository.update(dto, { where: { id } });
    const card = await this.cardRepository.findOne({ where: { id } });
    return card;
  }
}
