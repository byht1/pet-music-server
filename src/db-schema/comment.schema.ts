import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Track } from './track.schema';

export type CommentDocument = Comment & Document;

@Schema({ versionKey: false, timestamps: true })
export class Comment {
  @Prop({
    type: String,
    required: true,
    default: 'Anonymous',
  })
  username: string;

  @Prop({
    type: String,
    required: true,
  })
  text_comment: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Track',
    required: true,
  })
  track_id: Track;

  @Prop({
    type: Number,
    default: 0,
  })
  likes: number;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
