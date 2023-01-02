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

  @Get('/like/:id')
  likesPlus(@Param('id') id: ObjectId) {
    return this.albumService.likesPlus(id);
  }

  @ApiHeader({
    name: 'Authorization',
    required: true,
    description: 'The token issued to the current user.',
  })
  @ApiResponse({ status: 201, type: [String] })
  @ApiResponse({ status: 403, description: 'Не валідний токен' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @UseGuards(JwtAuthGuard)
  @Get('user/album-list-push')
  albumUser(@Req() req: Request) {
    const {
      user: { id },
    }: any = req;

    return this.albumService.albumUser(id);
  }
}
