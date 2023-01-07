import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Track } from './track.schema';
import { Comment } from './comment.schema';

export type AlbumDocument = Album & Document;

@Schema({ versionKey: false, timestamps: true })
export class Album {
  @Prop({
    type: String,
    required: true,
  })
  name_album: string;

  @Prop({
    type: String,
    default: '',
  })
  picture: string;

  @Prop({
    type: String,
    required: true,
  })
  artist: string;

  @Prop({
    type: [String],
    default: [],
  })
  genre: string[];

  @Prop()
  release_date: string;

  @Prop({
    type: Number,
    default: 0,
  })
  likes: number;

  @ApiProperty({ type: () => [Track] })
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Track' }],
    default: [],
  })
  album_tracks: Track[];

  @ApiProperty({ type: () => [Comment] })
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    default: [],
  })
  comments: Comment[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  })
  user: ObjectId;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
