import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ObjectId } from 'mongoose';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';
import { NewTrackDto } from './dto/newTrack.dto';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'picture', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  @Post()
  newTrack(@UploadedFiles() files, @Body() newTrack: NewTrackDto) {
    const { picture, audio } = files;
    return this.trackService.newTrack(newTrack, picture[0], audio[0]);
  }

  @Get()
  trackAll() {
    return this.trackService.trackAll();
  }

  @Get('/:id')
  trackById(@Param('id') id: ObjectId) {
    return this.trackService.trackById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  updateTrack(@Body() newTrack: NewTrackDto, @Param('id') id: ObjectId) {
    return this.trackService.updateTrack(newTrack, id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  declareTrack(@Param('id') id: ObjectId) {
    return this.trackService.declareTrack(id);
  }

  @Get('/:id')
  likesPlus(@Param('id') id: ObjectId) {
    return this.trackService.likesPlus(id);
  }
}
