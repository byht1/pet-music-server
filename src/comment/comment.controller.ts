import { Controller, Post, Body } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post()
  newComment(@Body() comment: CommentDto) {
    return this.commentService.newComment(comment);
  }
}
