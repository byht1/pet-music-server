import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { Document } from 'mongoose';
import { Track } from './track.schema';

export type UserDocument = User & Document;

@Schema({ versionKey: false, timestamps: true })
export class User {
  @ApiProperty({ name: '_id', example: 'id треку' })
  @ApiProperty({ example: 'Назва треку' })
  @Prop({
    type: String,
    required: true,
  })
  username: string;

  @Prop({
    type: String,
    required: true,
  })
  password: string;

  @ApiProperty({ example: 'Електрона пошта користувача' })
  @Prop({
    type: String,
    required: true,
  })
  email: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiI.eyJpZCI6IjYLCJpYXQiOjE2NjU2NTM2NgsImV4cCI6MTY2NTc0MDA3OH0.mZMKEw1j3N9VVZ97E',
  })
  @Prop({
    type: String,
    default: null,
  })
  token: string;

  @ApiProperty({ example: ['id треків користувача'] })
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Track' }],
    default: [],
  })
  track_list: Track[];

  @ApiProperty({ example: ['id треків які додав користувач'] })
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Track' }],
    default: [],
  })
  track_push: Track[];
}

export const UserSchema = SchemaFactory.createForClass(User);