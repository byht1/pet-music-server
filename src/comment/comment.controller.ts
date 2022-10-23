import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';
import { ObjectId } from 'mongoose';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post()
  newComment(@Body() comment: CommentDto) {
    return this.commentService.newComment(comment);
  }

  @Get()
  commentAll() {
    return this.commentService.commentAll();
  }

  @Get('/:id')
  commentsById(@Param('id') id: ObjectId) {
    return this.commentService.commentsTrackAll(id);
  }

  @Get('/:trackId')
  commentsTrackAll(@Param('trackId') trackId: ObjectId) {
    return this.commentService.commentsTrackAll(trackId);
  }

  @Put('/:id')
  updateComment(@Body() comment: CommentDto, @Param('id') id: ObjectId) {
    return this.commentService.updateComment(comment, id);
  }

  @Delete('/:id')
  deleteComment(@Param('id') id: ObjectId) {
    return this.commentService.deleteComment(id);
  }

  @Get('/:id')
  likesPlus(@Param('id') id: ObjectId) {
    return this.commentService.likesPlus(id);
  }
}
