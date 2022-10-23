import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Comment, CommentDocument } from 'src/db-schema/comment.schema';
import { Track, TrackDocument } from 'src/db-schema/track.schema';
import { CommentDto } from './dto/comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModule: Model<CommentDocument>,
    @InjectModel(Track.name) private trackModule: Model<TrackDocument>,
  ) {}

  async newComment(comment: CommentDto): Promise<CommentDocument> {
    const { track_id } = comment;
    const track = await this.trackModule.findById(track_id);
    const response = await this.commentModule.create({ ...comment });
    track.comments.push(response.id);
    await track.save();
    return response;
  }

  async commentAll(): Promise<CommentDocument[]> {
    const response = await this.commentModule.find();
    return response;
  }

  async commentsById(id: ObjectId): Promise<CommentDocument> {
    const response = await this.commentModule.findById(id);
    return response;
  }

  async commentsTrackAll(trackId: ObjectId): Promise<CommentDocument[]> {
    const response = await this.commentModule.find({ track_id: trackId });
    return response;
  }

  async updateComment(
    comment: CommentDto,
    id: ObjectId,
  ): Promise<CommentDocument> {
    const response = await this.commentModule.findByIdAndUpdate(id, comment, {
      new: true,
    });
    return response;
  }

  async deleteComment(id: ObjectId): Promise<CommentDocument> {
    const response = this.commentModule.findByIdAndDelete(id);
    return response;
  }

  async likesPlus(id: ObjectId): Promise<void> {
    const response = await this.commentModule.findById(id);
    response.likes += 1;
  }
}
