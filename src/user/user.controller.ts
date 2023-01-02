import { GoogleGuard } from './guard/google.guard';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { Request } from 'express';
import { User } from 'src/db-schema/user-schema';
import { SignUpDto } from './dto/signUpDto';
import { ValidatePipe } from './pipe/validete.pipe';
import { RequestCustom } from './type/req';
import passport from 'passport';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiResponse({ status: 201, type: User })
  @ApiResponse({ status: 400, description: 'Не валіднні данні' })
  @ApiResponse({
    status: 409,
    description: 'Користувач з такою елктроною поштою уже існує',
  })
  @ApiResponse({ status: 500, description: 'Server error' })
  @UsePipes(ValidatePipe)
  @Post('/sing-up')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.userService.signUp(signUpDto);
  }

  @Get('/google/login')
  @UseGuards(GoogleGuard)
  googleLogIn() {
    return { msg: 'Google Authentication' };
  }

  @Get('/google/redirect')
  @UseGuards(GoogleGuard)
  googleRedirect(@Req() req: RequestCustom) {
    console.log(11111);
    return { msg: 'OK' };

    // return this.userService.generatorToken({ id: req.user._id });
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
