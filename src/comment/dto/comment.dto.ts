import { ObjectId } from 'mongoose';

export class CommentDto {
  readonly username: string;
  readonly text_comment: string;
  readonly track_id: ObjectId;
  readonly likes: number;
}
