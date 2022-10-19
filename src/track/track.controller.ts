import { Controller, Get, Post, Body } from '@nestjs/common';
import { NewTrackDto } from './dto/newTrack.dto';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Post()
  newTrack(@Body() newTrack: NewTrackDto) {
    return this.trackService.newTrack(newTrack);
  }

  @Get()
  trackAll() {
    return this.trackService.trackAll();
  }
}
