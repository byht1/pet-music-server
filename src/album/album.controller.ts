import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AlbumDto } from './dto/album.dto';
import { ObjectId } from 'mongoose';
import { AlbumService } from './album.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';
import { Request } from 'express';

@ApiTags('Album')
@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileFieldsInterceptor([{ name: 'picture', maxCount: 1 }]))
  newAlbum(
    @Body() albumDto: AlbumDto,
    @UploadedFiles() files,
    @Req() req: Request,
  ) {
    const {
      user: { id },
    }: any = req;
    const { picture } = files;

    return this.albumService.newAlbum(albumDto, picture[0], id);
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
