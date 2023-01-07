import { RequestId } from './../user/type/req';
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
import { AlbumDto } from './dto/album.dto';
import { ObjectId } from 'mongoose';
import { AlbumService } from './album.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/user/guard/jwt-auth.guard';
import { NewTrackDto } from 'src/track/dto/newTrack.dto';

@ApiTags('Album')
@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'picture_link', maxCount: 1 },
      { name: 'audio_link', maxCount: 1 },
    ]),
  )
  newAlbum(
    @Body() albumDto: AlbumDto & NewTrackDto,
    @UploadedFiles() files,
    @Req() req: RequestId,
  ) {
    console.log('🚀  AlbumController  files', files);
    console.log('🚀  AlbumController  albumDto', albumDto);
    return this.albumService.newAlbum(
      albumDto,
      { picture: files.picture_link[0], audio: files.audio[0] },
      req.user.id,
    );
  }

  // @Get()
  // albumAll() {
  //   return this.albumService.albumAll();
  // }

  // @Get('/:id')
  // albumById(@Param('id') id: ObjectId) {
  //   return this.albumService.albumById(id);
  // }

  // @Get('/like/:id')
  // likesPlus(@Param('id') id: ObjectId) {
  //   return this.albumService.likesPlus(id);
  // }

  // @ApiHeader({
  //   name: 'Authorization',
  //   required: true,
  //   description: 'The token issued to the current user.',
  // })
  // @ApiResponse({ status: 201, type: [String] })
  // @ApiResponse({ status: 403, description: 'Не валідний токен' })
  // @ApiResponse({ status: 500, description: 'Server error' })
  // @UseGuards(JwtAuthGuard)
  // @Get('user/album-list-push')
  // albumUser(@Req() req: Request) {
  //   const {
  //     user: { id },
  //   }: any = req;

  //   return this.albumService.albumUser(id);
  // }
}
