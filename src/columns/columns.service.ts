import { Inject, Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TrelloColumn } from './columns.model';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';

@Injectable({ scope: Scope.REQUEST })
export class ColumnsService {
  constructor(
    @InjectModel(TrelloColumn) private columnRepository: typeof TrelloColumn,
  ) {}

  async createColumn(req: any, dto: CreateColumnDto) {
    const user_id = req.user.id;
    const column = await this.columnRepository.create({
      ...dto,
      user_id: user_id,
    });
    return column;
  }

  async getColumnById(id: number) {
    const column = await this.columnRepository.findOne({
      include: { all: true },
      where: { id },
    });
    return column;
  }

  async updateColumn(id: number, dto: UpdateColumnDto) {
    await this.columnRepository.update(dto, { where: { id } });
    const column = await this.columnRepository.findOne({ where: { id } });
    return column;
  }

  async deleteColumn(id: number) {
    await this.columnRepository.destroy({ where: { id } });
  }
}
