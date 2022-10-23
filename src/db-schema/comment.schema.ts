import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { Document } from 'mongoose';
import { Track } from './track.schema';

export type CommentDocument = Comment & Document;

@Schema({ versionKey: false, timestamps: true })
export class Comment {
  @ApiProperty({ name: '_id', example: 'id коментаря' })
  @ApiProperty({ example: 'Назва треку' })
  @Prop({
    type: String,
    required: true,
    default: 'Anonymous',
  })
  username: string;

  @ApiProperty({ example: 'Текст коментаря' })
  @Prop({
    type: String,
    required: true,
  })
  text_comment: string;

  @ApiProperty({ example: 'id треку' })
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Track',
    required: true,
  })
  track_id: () => Track;

  @ApiProperty()
  @Prop({
    type: Number,
    default: 0,
  })
  likes: number;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
