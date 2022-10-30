import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AlbumDto } from './dto/album.dto';
import { ObjectId } from 'mongoose';
import { AlbumService } from './album.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@ApiTags('Album')
@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'picture', maxCount: 1 }]))
  newAlbum(@Body() albumDto: AlbumDto, @UploadedFiles() files) {
    const { picture } = files;
    return this.albumService.newAlbum(albumDto, picture[0]);
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
