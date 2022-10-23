import { Injectable } from '@nestjs/common';
import { AlbumDto } from './dto/aibum.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Album, AlbumDocument } from 'src/db-schema/album.schema';
import { Model, ObjectId } from 'mongoose';

@Injectable()
export class AlbumService {
  constructor(
    @InjectModel(Album.name) private albumSchema: Model<AlbumDocument>,
  ) {}

  async newAlbum(albumDto: AlbumDto): Promise<AlbumDocument> {
    const response = await this.albumSchema.create({ ...albumDto });
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
