import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';
import { NewTrackDto } from './dto/newTrack.dto';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  newTrack(@Body() newTrack: NewTrackDto) {
    return this.trackService.newTrack(newTrack);
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
}
