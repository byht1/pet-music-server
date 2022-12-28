import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from 'src/db-schema/user-schema';
import { UserDto } from './dto/user.dto';
import { Request } from 'express';
import { NewUserDto } from './dto/signUpDto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async signUp(user: NewUserDto): Promise<UserDocument> {
    const { email, password, username } = user;
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

    const payload = { username, email, id: newUser._id };

    const userPlusToken = this.generatorToken(payload);

    return userPlusToken;
  }

  async logIn(user: UserDto): Promise<UserDocument> {
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

    const userToken = await this.generatorToken(payload);

    return userToken;
  }

  async logOut(id: ObjectId) {
    await this.userModel.findByIdAndUpdate(id, { token: '' }, { new: true });

    return '';
  }

  async userById(id: ObjectId): Promise<UserDocument> {
    return await this.userModel.findById(id);
  }

  async current(req: Request): Promise<UserDocument> {
    const {
      user: { username, email, id },
    }: any = req;

    const payload = { username, email, id };
    const userToken = await this.generatorToken(payload);

    return userToken;
  }

  async albumUser(id: ObjectId) {
    const data = await this.userModel.findById(id).populate('album');
    // const data = this.userModel
    //   .findById(id, { album_push: true })
    //   .populate('albums');
    return data;
  }

  private async generatorToken(payload): Promise<UserDocument> {
    const id = payload.id;
    const token = this.jwtService.sign(payload);

    const user = await this.userModel.findByIdAndUpdate(
      id,
      { token },
      { new: true },
    );

    return user;
  }
}
