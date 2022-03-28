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
import { CommentsService } from './comments.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TrelloComment } from './comments.model';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { OwnerCommentsGuard } from './owner-comments.guard';

@ApiTags('Comments')
@Controller('cards/:cardId/comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @ApiOperation({ summary: 'Creating comment' })
  @ApiResponse({ status: 200, type: TrelloComment })
  @Post()
  create(@Body() dto: CreateCommentDto, @Param('cardId') cardId: number) {
    return this.commentsService.createComment(cardId, dto);
  }

  @ApiOperation({ summary: 'Get comment by id' })
  @ApiResponse({ status: 200, type: TrelloComment })
  @Get('/:commentId')
  getById(
    @Param('cardId') cardId: number,
    @Param('commentId') commentId: number,
  ) {
    return this.commentsService.getCommentById(commentId);
  }

  @ApiOperation({ summary: 'Delete comment' })
  @ApiResponse({ status: 200, type: TrelloComment })
  @UseGuards(OwnerCommentsGuard)
  @Delete('/:commentId')
  delete(
    @Param('cardId') cardId: number,
    @Param('commentId') commentId: number,
  ) {
    return this.commentsService.deleteComment(commentId);
  }

  @ApiOperation({ summary: 'Update comment' })
  @ApiResponse({ status: 200, type: TrelloComment })
  @UseGuards(OwnerCommentsGuard)
  @Put('/:commentId')
  update(
    @Body() dto: UpdateCommentDto,
    @Param('cardId') cardId: number,
    @Param('commentId') commentId: number,
  ) {
    return this.commentsService.updateComment(commentId, dto);
  }
}
