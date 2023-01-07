import { Injectable } from '@nestjs/common';
import { AlbumDto } from './dto/album.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Album, AlbumDocument } from 'src/db-schema/album.schema';
import { User, UserDocument } from 'src/db-schema/user-schema';
import { Model, ObjectId } from 'mongoose';
import { fbStorage, FileType } from 'src/firebase/firebace';
import { UserService } from 'src/user/user.service';
import { TrackService } from 'src/track/track.service';
import { NewAlbumTrackDto } from 'src/track/dto/newAlbumTrackDto';

export type RFiles = {
  picture?: any;
  audio: any;
};

@Injectable()
export class AlbumService {
  constructor(
    @InjectModel(Album.name) private albumSchema: Model<AlbumDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private userService: UserService,
    private trackService: TrackService,
  ) {}

  async newAlbum(
    albumDto: AlbumDto & NewAlbumTrackDto,
    files: RFiles,
    id: ObjectId,
  ): Promise<AlbumDocument> {
    const newAlbum = await this.albumSchema.create({
      ...albumDto,
      user: id,
    });

    const trackDto: NewAlbumTrackDto = {
      name: albumDto.name,
      genre: albumDto.genre,
      author_track: albumDto.author_track,
      text_track: albumDto.text_track,
    };

    const track = await this.trackService.newAlbumPlusTrack(
      newAlbum._id,
      files,
      trackDto,
    );

    newAlbum.album_tracks.push(track._id);

    newAlbum.save();

    return newAlbum;
  }

  // async albumAll(): Promise<AlbumDocument[]> {
  //   const response = await this.albumSchema.find();
  //   return response;
  // }

  // async albumById(id: ObjectId): Promise<AlbumDocument> {
  //   const response = await this.albumSchema.findById(id).populate('comments');
  //   return response;
  // }

  // async likesPlus(id: ObjectId): Promise<void> {
  //   const response = await this.albumSchema.findById(id);
  //   response.likes += 1;
  //   response.save();
  // }

  // async albumUser(id: ObjectId) {
  //   const data = await this.userModel
  //     .findById(id, 'album_push')
  //     .populate('album_push');
  //   return data.album_push.map((album) => album.name_album);
  // }
}
