import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AlbumDto } from './dto/album.dto';
import { ObjectId } from 'mongoose';
import { AlbumService } from './album.service';

@ApiTags('Album')
@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Post()
  newAlbum(@Body() albumDto: AlbumDto) {
    return this.albumService.newAlbum(albumDto);
  }

  @Get()
  albumAll() {
    return this.albumService.albumAll();
  }

  @Get('/:id')
  albumById(@Param('id') id: ObjectId) {
    return this.albumService.albumById(id);
  }

  @Get('/:id')
  likesPlus(@Param('id') id: ObjectId) {
    return this.albumService.likesPlus(id);
  }
}
