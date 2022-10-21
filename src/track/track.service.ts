import { Injectable } from '@nestjs/common';
import { NewTrackDto } from './dto/newTrack.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Track, TrackDocument } from 'src/db-schema/track.schema';
import { Model, ObjectId } from 'mongoose';
import { Comment, CommentDocument } from 'src/db-schema/comment.schema';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModule: Model<TrackDocument>,
    @InjectModel(Comment.name) private commentModule: Model<CommentDocument>,
  ) {}

  async newTrack(newTrack: NewTrackDto): Promise<TrackDocument> {
    const response = await this.trackModule.create(newTrack);
    return response;
  }

  async trackAll(): Promise<TrackDocument[]> {
    const response = await this.trackModule.find().populate('comments');
    return response;
  }

  async trackById(id: ObjectId): Promise<TrackDocument> {
    const response = await this.trackModule.findById(id).populate('comments');
    return response;
  }

  async updateTrack(
    newTrack: NewTrackDto,
    id: ObjectId,
  ): Promise<TrackDocument> {
    const response = await this.trackModule.findByIdAndUpdate(id, newTrack, {
      new: true,
    });

    return response;
  }

  async declareTrack(id: ObjectId): Promise<TrackDocument> {
    const response = await this.trackModule.findByIdAndDelete(id);
    const comments = response.comments;
    console.log('🚀 ~ TrackService ~ comments', comments);
    if (comments.length !== 0) {
      for (const comment of comments) {
        await this.commentModule.findByIdAndDelete(comment);
      }
    }
    return response;
  }
}
