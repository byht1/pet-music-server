import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Request } from 'express';
import { User } from 'src/db-schema/user-schema';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiResponse({ status: 201, type: User })
  @ApiResponse({ status: 400, description: 'Не валіднні данні' })
  @ApiResponse({
    status: 409,
    description: 'Користувач з такою елктроною поштою уже існує',
  })
  @ApiResponse({ status: 500, description: 'Server error' })
  @Post('/signup')
  signUp(@Body() userDto: UserDto) {
    return this.userService.signUp(userDto);
  }

  @ApiResponse({ status: 201, type: User })
  @ApiResponse({ status: 401, description: 'Не правильний пароль або email' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @Post('/login')
  logIn(@Body() userDto: UserDto) {
    console.log('login');
    return this.userService.logIn(userDto);
  }

  @ApiHeader({
    name: 'Authorization',
    required: true,
    description: 'The token issued to the current user.',
  })
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 403, description: 'Не валідний токен' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  @Get('/logout')
  logOut(@Req() req: Request) {
    const {
      user: { id },
    }: any = req;

    return this.userService.logOut(id);
  }

  @ApiHeader({
    name: 'Authorization',
    required: true,
    description: 'The token issued to the current user.',
  })
  @ApiResponse({ status: 201, type: User })
  @ApiResponse({ status: 403, description: 'Не валідний токен' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @UseGuards(JwtAuthGuard)
  @Get('/login')
  current(@Req() req: Request) {
    return this.userService.current(req);
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
  @Get('/album')
  albumUser(@Req() req: Request) {
    const {
      user: { id },
    }: any = req;

    return this.userService.albumUser(id);
  }
}
