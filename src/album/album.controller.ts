import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AlbumDto } from './dto/aibum.dto';
import { ObjectId } from 'mongoose';
import { AlbumService } from './album.service';

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
