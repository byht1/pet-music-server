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
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';
import { NewTrackDto } from './dto/newTrack.dto';
import { TrackService } from './track.service';
import { Track } from 'src/db-schema/track.schema';

@ApiTags('Track')
@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @ApiHeader({
    name: 'Authorization',
    required: true,
    description: 'The token issued to the current user.',
  })
  @ApiResponse({
    status: 201,
    type: Track,
  })
  @ApiResponse({ status: 403, description: 'Не валідний токен' })
  @ApiResponse({ status: 500, description: 'Server error' })
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

  @ApiResponse({
    status: 201,
    type: [Track],
  })
  @ApiResponse({ status: 500, description: 'Server error' })
  @Get()
  trackAll() {
    return this.trackService.trackAll();
  }

  @ApiResponse({
    status: 201,
    type: Track,
  })
  @ApiResponse({ status: 500, description: 'Server error' })
  @Get('/:id')
  trackById(@Param('id') id: ObjectId) {
    return this.trackService.trackById(id);
  }

  @ApiHeader({
    name: 'Authorization',
    required: true,
    description: 'The token issued to the current user.',
  })
  @ApiResponse({
    status: 201,
    type: Track,
  })
  @ApiResponse({ status: 403, description: 'Не валідний токен' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  updateTrack(@Body() newTrack: NewTrackDto, @Param('id') id: ObjectId) {
    return this.trackService.updateTrack(newTrack, id);
  }

  @ApiHeader({
    name: 'Authorization',
    required: true,
    description: 'The token issued to the current user.',
  })
  @ApiResponse({
    status: 201,
    type: Track,
  })
  @ApiResponse({ status: 403, description: 'Не валідний токен' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  declareTrack(@Param('id') id: ObjectId) {
    return this.trackService.declareTrack(id);
  }

  @ApiResponse({ status: 500, description: 'Server error' })
  @Get('/:id')
  likesPlus(@Param('id') id: ObjectId) {
    return this.trackService.likesPlus(id);
  }
}
