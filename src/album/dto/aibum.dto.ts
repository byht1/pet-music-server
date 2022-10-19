import { ObjectId } from 'mongoose';

export class AlbumDto {
  readonly name_album: string;
  readonly picture: string;
  readonly author: string;
  readonly genre: string;
  readonly group_name: string;
  readonly release_date: string;
}
