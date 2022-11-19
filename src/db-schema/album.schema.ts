import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Track } from './track.schema';
import { Comment } from './comment.schema';

export type AlbumDocument = Album & Document;

@Schema({ versionKey: false, timestamps: true })
export class Album {
  @Prop()
  name_album: string;

  @Prop()
  picture: string;

  @Prop()
  author: string;

  @ApiProperty({ type: () => [Track] })
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Track' }],
    default: [],
  })
  album_tracks: Track[];

  @Prop()
  genre: string[];

  @Prop()
  group_name: string;

  @Prop()
  release_date: string;

  @Prop({
    type: Number,
    default: 0,
  })
  likes: number;

  @ApiProperty({ type: () => [Comment] })
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    default: [],
  })
  comments: Comment[];
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
