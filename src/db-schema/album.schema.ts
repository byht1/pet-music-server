import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Track } from './track.schema';

export type AlbumDocument = Album & Document;

@Schema()
export class Album {
  @Prop()
  album_name: string;

  @Prop()
  picture: string;

  @Prop()
  author: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Track' }],
    default: [],
  })
  album_tracks: Track[];

  @Prop()
  group_name: string;

  @Prop()
  release_date: string;

  @Prop({
    type: Number,
    default: 0,
  })
  likes: number;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
