import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { OwnerCardsGuard } from './owner-cards.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Card } from './cards.model';

@ApiTags('Cards')
@Controller('columns/:columnId/cards')
export class CardsController {
  constructor(private cardService: CardsService) {}

  @ApiOperation({ summary: 'Creating card' })
  @ApiResponse({ status: 200, type: Card })
  @Post()
  create(@Body() dto: CreateCardDto, @Param('columnId') columnId: number) {
    return this.cardService.createCard(columnId, dto);
  }

  @ApiOperation({ summary: 'Get card by id' })
  @ApiResponse({ status: 200, type: Card })
  @Get('/:cardId')
  getById(
    @Param('columnId') columnId: number,
    @Param('cardId') cardId: number,
  ) {
    return this.cardService.getCardById(cardId);
  }

  @ApiOperation({ summary: 'Update card' })
  @ApiResponse({ status: 200, type: Card })
  @UseGuards(OwnerCardsGuard)
  @Put('/:cardId')
  update(
    @Body() dto: UpdateCardDto,
    @Param('columnId') columnId: number,
    @Param('cardId') cardId: number,
  ) {
    return this.cardService.updateCard(cardId, dto);
  }

  @ApiOperation({ summary: 'Delete card' })
  @ApiResponse({ status: 200, type: Card })
  @UseGuards(OwnerCardsGuard)
  @Delete('/:cardId')
  delete(@Param('columnId') columnId: number, @Param('cardId') cardId: number) {
    return this.cardService.deleteCard(cardId);
  }
}
