import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from 'src/db-schema/user-schema';
import { UserDto } from './dto/user.dto';
import { Request } from 'express';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async signUp(user: UserDto): Promise<UserDocument> {
    const { email, password } = user;
    const isUser = await this.userModel.findOne({ email });

    if (isUser) {
      throw new HttpException(
        'Користувач з таким емейлом існує',
        HttpStatus.CONFLICT,
      );
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await this.userModel.create({
      ...user,
      password: hashPassword,
    });

    return newUser;
  }

  async logIn(user: UserDto) {
    const { username, email, password } = user;

    const isUser = await this.userModel.findOne({ username });

    if (!isUser) {
      throw new HttpException('Користувача не існує', HttpStatus.UNAUTHORIZED);
    }

    const passwordEquals = await bcrypt.compare(password, isUser.password);

    if (!passwordEquals) {
      throw new HttpException('Не правильний пароль', HttpStatus.UNAUTHORIZED);
    }

    const payload = { username, email, id: isUser._id };

    const token = await this.generatorToken(payload);

    return { token, username, email };
  }

  async logOut(id: ObjectId) {
    await this.userModel.findByIdAndUpdate(id, { token: '' }, { new: true });

    return '';
  }

  async current(req: Request) {
    const {
      user: { username, email, id },
    }: any = req;

    const payload = { username, email, id };
    const token = await this.generatorToken(payload);

    return { ...payload, token };
  }

  private async generatorToken(payload): Promise<string> {
    const id = payload.id;
    const token = this.jwtService.sign(payload);

    await this.userModel.findByIdAndUpdate(id, { token }, { new: true });

    return token;
  }
}
