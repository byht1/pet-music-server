import { Injectable } from '@nestjs/common';
import { NewTrackDto } from './dto/newTrack.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Track, TrackDocument } from 'src/db-schema/track.schema';
import { Model } from 'mongoose';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModule: Model<TrackDocument>,
  ) {}

  async newTrack(newTrack: NewTrackDto): Promise<TrackDocument> {
    const response = await this.trackModule.create(newTrack);
    return response;
  }

  async trackAll(): Promise<TrackDocument[]> {
    const response = await this.trackModule.find().populate('comments');
    return response;
  }
}
