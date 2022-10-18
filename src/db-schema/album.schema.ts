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

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Track' }] })
  album_tracks: Track[];
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
