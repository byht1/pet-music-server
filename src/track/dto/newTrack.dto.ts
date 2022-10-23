import { ApiProperty } from '@nestjs/swagger';

export class NewTrackDto {
  @ApiProperty({ example: 'Назва треку' })
  readonly name: string;

  @ApiProperty({ example: 'Назва альбому' })
  readonly author_track: string;

  @ApiProperty({ example: '23.10.2022' })
  readonly date_implementation: string;

  @ApiProperty({ example: 'link' })
  readonly audio: string;

  @ApiProperty({ example: 'link' })
  readonly picture: string;

  @ApiProperty({ example: 'Текст до треку' })
  readonly text_track: string;

  @ApiProperty({ example: ['Жанр'] })
  readonly genre: string[];
  // readonly album: string;
  readonly likes: number;
}
