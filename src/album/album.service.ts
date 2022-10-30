import { Injectable } from '@nestjs/common';
import { AlbumDto } from './dto/album.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Album, AlbumDocument } from 'src/db-schema/album.schema';
import { Model, ObjectId } from 'mongoose';
import { fbStorage, FileType } from 'src/firebase/firebace';

@Injectable()
export class AlbumService {
  constructor(
    @InjectModel(Album.name) private albumSchema: Model<AlbumDocument>,
  ) {}

  async newAlbum(albumDto: AlbumDto, picture): Promise<AlbumDocument> {
    console.log('🚀 ~ AlbumService ~ albumDto', albumDto.genre);
    const picturePath = await fbStorage(FileType.IMAGE, picture);
    const response = await this.albumSchema.create({
      ...albumDto,
      picture: picturePath,
      genre: albumDto.genre.split(','),
    });
    return response;
  }

  async albumAll(): Promise<AlbumDocument[]> {
    const response = await this.albumSchema.find();
    return response;
  }

  async albumById(id: ObjectId): Promise<AlbumDocument> {
    const response = await this.albumSchema.findById(id);
    return response;
  }

  async likesPlus(id: ObjectId): Promise<void> {
    const response = await this.albumSchema.findById(id);
    response.likes += 1;
  }
}
