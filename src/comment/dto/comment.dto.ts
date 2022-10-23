import { ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class CommentDto {
  @ApiProperty({ example: 'nickname користувача', required: false })
  readonly username: string;

  @ApiProperty({ example: 'текст коментаря', required: false })
  readonly text_comment: string;

  @ApiProperty({ example: 'id треку' })
  readonly track_id: ObjectId;
  readonly likes: number;
}
