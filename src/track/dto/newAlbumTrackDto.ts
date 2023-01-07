import { ApiProperty } from '@nestjs/swagger';

export class NewAlbumTrackDto {
  @ApiProperty({ example: 'Назва треку' })
  readonly name: string;

  @ApiProperty({ example: 'Назва альбому' })
  readonly author_track: string;

  @ApiProperty({ example: 'Текст до треку' })
  readonly text_track: string;

  @ApiProperty({ example: ['Жанр'] })
  readonly genre: string[];
}
