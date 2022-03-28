import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TrelloComment } from './comments.model';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(TrelloComment) private commentRepository: typeof TrelloComment,
  ) {}

  async createComment(cardId: number, dto: CreateCommentDto) {
    const comment = await this.commentRepository.create({
      ...dto,
      card_id: cardId,
    });
    return comment;
  }

  async getCommentById(id: number) {
    const comment = await this.commentRepository.findOne({
      include: { all: true },
      where: { id },
    });
    return comment;
  }

  async updateComment(id: number, dto: UpdateCommentDto) {
    await this.commentRepository.update(dto, { where: { id } });
    const comment = this.commentRepository.findOne({ where: { id } });
    return comment;
  }

  async deleteComment(id: number) {
    await this.commentRepository.destroy({ where: { id } });
  }
}
