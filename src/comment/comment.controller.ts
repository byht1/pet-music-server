import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';
import { ObjectId } from 'mongoose';
import { Comment } from 'src/db-schema/comment.schema';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @ApiResponse({ status: 201, type: Comment })
  @ApiResponse({ status: 400, description: 'не валіднні данні' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @Post()
  newComment(@Body() comment: CommentDto) {
    return this.commentService.newComment(comment);
  }

  @ApiResponse({ status: 201, type: [Comment] })
  @ApiResponse({ status: 500, description: 'Server error' })
  @Get()
  commentAll() {
    return this.commentService.commentAll();
  }

  @ApiResponse({ status: 201, type: Comment })
  @ApiResponse({ status: 500, description: 'Server error' })
  @Get('/:id')
  commentsById(@Param('id') id: ObjectId) {
    return this.commentService.commentsTrackAll(id);
  }

  @ApiResponse({ status: 201, type: [Comment] })
  @ApiResponse({ status: 500, description: 'Server error' })
  @Get('/:trackId')
  commentsTrackAll(@Param('trackId') trackId: ObjectId) {
    return this.commentService.commentsTrackAll(trackId);
  }

  @ApiResponse({ status: 201, type: Comment })
  @ApiResponse({ status: 400, description: 'не валіднні данні' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @Put('/:id')
  updateComment(@Body() comment: CommentDto, @Param('id') id: ObjectId) {
    return this.commentService.updateComment(comment, id);
  }

  @ApiResponse({ status: 201, type: Comment })
  @ApiResponse({ status: 500, description: 'Server error' })
  @Delete('/:id')
  deleteComment(@Param('id') id: ObjectId) {
    return this.commentService.deleteComment(id);
  }

  @ApiResponse({ status: 201 })
  @ApiResponse({ status: 500, description: 'Server error' })
  @Get('/:id')
  likesPlus(@Param('id') id: ObjectId) {
    return this.commentService.likesPlus(id);
  }
}
