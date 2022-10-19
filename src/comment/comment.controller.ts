import { Controller, Get, Post, Body, Param } from '@nestjs/common';
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

  @Get('/:trackId')
  commentAll(@Param('trackId') trackId: ObjectId) {
    return this.commentService.commentAll(trackId);
  }
}
