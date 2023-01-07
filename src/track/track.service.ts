import { Injectable } from '@nestjs/common';
import { NewTrackDto } from './dto/newTrack.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Track, TrackDocument } from 'src/db-schema/track.schema';
import { Model, ObjectId } from 'mongoose';
import { Comment, CommentDocument } from 'src/db-schema/comment.schema';
import { fbStorage, FileType } from 'src/firebase/firebace';
import { RFiles } from 'src/album/album.service';
import { NewAlbumTrackDto } from './dto/newAlbumTrackDto';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModule: Model<TrackDocument>,
    @InjectModel(Comment.name) private commentModule: Model<CommentDocument>,
  ) {}

  async newTrack(
    newTrack: NewTrackDto,
    picture,
    audio,
  ): Promise<TrackDocument> {
    const audioPath = await fbStorage(FileType.AUDIO, audio);
    const picturePath = await fbStorage(FileType.IMAGE, picture);

    const response = await this.trackModule.create({
      ...newTrack,
      picture: picturePath,
      audio: audioPath,
    });
    return response;
  }

  async newAlbumPlusTrack(
    albumId: ObjectId,
    files: RFiles,
    data: NewAlbumTrackDto,
  ): Promise<TrackDocument> {
    const filePath = await this.filePush(files);

    const response = await this.trackModule.create({
      ...data,
      picture: filePath.picturePath,
      audio: filePath.audioPath,
      album: albumId,
    });

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
    if (comments.length !== 0) {
      for (const comment of comments) {
        await this.commentModule.findByIdAndDelete(comment);
      }
    }
    return response;
  }

  async likesPlus(id: ObjectId): Promise<void> {
    const response = await this.trackModule.findById(id);
    response.likes += 1;
  }

  private async filePush({ audio, picture }: RFiles): Promise<{
    audioPath: string;
    picturePath: string;
  }> {
    const audioPath = await fbStorage(FileType.AUDIO, audio);
    const picturePath = picture ? await fbStorage(FileType.IMAGE, picture) : '';

    return { audioPath, picturePath };
  }
}
