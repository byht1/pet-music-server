import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  signUp(@Body() userDto: UserDto) {
    return this.userService.signUp(userDto);
  }

  @Post('/login')
  logIn(@Body() userDto: UserDto) {
    return this.userService.logIn(userDto);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  @Get('/logout')
  logOut(@Req() req: Request) {
    const {
      user: { id },
    }: any = req;

    return this.userService.logOut(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/login')
  current(@Req() req: Request) {
    return this.userService.current(req);
  }
}
