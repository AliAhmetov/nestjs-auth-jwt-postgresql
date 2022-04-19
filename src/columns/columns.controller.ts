import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put, Req,
  UseGuards
} from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TrelloColumn } from './columns.model';
import { UpdateColumnDto } from './dto/update-column.dto';
import { OwnerColumnsGuard } from './owner-columns.guard';

@ApiTags('Columns')
@Controller('columns')
export class ColumnsController {
  constructor(private columnService: ColumnsService) {}

  @ApiOperation({ summary: 'Creating column' })
  @ApiResponse({ status: 200, type: TrelloColumn })
  @Post()
  create(@Req() req, @Body() dto: CreateColumnDto) {
    return this.columnService.createColumn(req, dto);
  }

  @ApiOperation({ summary: 'Get column by id' })
  @ApiResponse({ status: 200, type: TrelloColumn })
  @Get('/:id')
  getById(@Param('id') id: number) {
    return this.columnService.getColumnById(id);
  }

  @ApiOperation({ summary: 'Update column' })
  @ApiResponse({ status: 200, type: TrelloColumn })
  @UseGuards(OwnerColumnsGuard)
  @Put('/:id')
  update(@Body() dto: UpdateColumnDto, @Param('id') id: number) {
    return this.columnService.updateColumn(id, dto);
  }

  @ApiOperation({ summary: 'Delete column' })
  @ApiResponse({ status: 200, type: TrelloColumn })
  @UseGuards(OwnerColumnsGuard)
  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.columnService.deleteColumn(id);
  }
}
