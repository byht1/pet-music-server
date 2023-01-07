import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { Document } from 'mongoose';
import { Album } from './album.schema';
import { Comment } from './comment.schema';

export type TrackDocument = Track & Document;

@Schema({ versionKey: false, timestamps: true })
export class Track {
  @ApiProperty({ name: '_id', example: 'id треку' })
  @ApiProperty({ example: 'Назва треку' })
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @ApiProperty({ example: 'id альбому' })
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Album',
    default: null,
  })
  album: Album;

  @ApiProperty({ example: 'link' })
  @Prop({
    type: String,
    required: true,
  })
  audio: string;

  @ApiProperty({ example: 'link' })
  @Prop({
    type: String,
    default: null,
  })
  picture: string;

  @ApiProperty({ example: 'Текст до треку' })
  @Prop({
    type: String,
    default: null,
  })
  text_track: string;

  @ApiProperty({ type: () => [Comment] })
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    default: [],
  })
  comments: Comment[];

  @ApiProperty()
  @Prop({
    type: [String],
    required: true,
  })
  genre: string[];

  @ApiProperty()
  @Prop({
    type: Number,
    default: 0,
  })
  likes: number;
}

export const TrackSchema = SchemaFactory.createForClass(Track);
