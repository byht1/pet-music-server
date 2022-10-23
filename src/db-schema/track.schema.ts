import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Album } from './album.schema';

export type TrackDocument = Track & Document;

@Schema({ versionKey: false, timestamps: true })
export class Track {
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
  })
  author_track: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Album',
    default: null,
  })
  album: Album;

  @Prop({
    type: String,
    required: true,
  })
  date_implementation: string;

  @Prop({
    type: String,
    required: true,
  })
  audio: string;

  @Prop({
    type: String,
    default: null,
  })
  picture: string;

  @Prop({
    type: String,
    default: null,
  })
  text_track: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    default: [],
  })
  comments: Comment[];

  @Prop({
    type: String,
    required: true,
  })
  genre: string;
}

export const TrackSchema = SchemaFactory.createForClass(Track);
