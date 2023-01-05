import { GoogleUserDto } from './dto/googleUserDto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from 'src/db-schema/user-schema';
import { UserDto } from './dto/user.dto';
import { SignUpDto } from './dto/signUpDto';
import { NewUserDto } from './dto/newUserDto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async googleAuth({
    email,
    name,
    picture,
  }: GoogleUserDto): Promise<UserDocument> {
    const isUser = await this.isUser(email);

    if (isUser) return await this.generatorToken(isUser._id);

    return await this.newUser({ email, username: name, picture });
  }

  async signUp(user: SignUpDto): Promise<UserDocument> {
    const { email, password, username } = user;
    const isUser = await this.isUser(email);

    if (isUser) {
      throw new HttpException(
        'Користувач з таким емейлом існує',
        HttpStatus.CONFLICT,
      );
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await this.newUser({
      email,
      username,
      password: hashPassword,
    });

    return newUser;
  }

  async logIn(user: UserDto): Promise<UserDocument> {
    const { email, password } = user;
    console.log('🚀  UserService  user', user);

    const isUser = await this.userModel.findOne({ email });

    if (!isUser) {
      throw new HttpException('Користувача не існує', HttpStatus.UNAUTHORIZED);
    }

    const passwordEquals = await bcrypt.compare(password, isUser.password);

    if (!passwordEquals) {
      throw new HttpException('Не правильний пароль', HttpStatus.UNAUTHORIZED);
    }

    const userToken = await this.generatorToken(isUser._id);

    return userToken;
  }

  async logOut(id: ObjectId) {
    await this.userModel.findByIdAndUpdate(id, { token: '' }, { new: true });

    return '';
  }

  async current(id: number): Promise<UserDocument> {
    return await this.generatorToken(id);
  }

  async userById(id: ObjectId): Promise<UserDocument> {
    return await this.userModel.findById(id);
  }

  private async generatorToken(id): Promise<UserDocument> {
    const payload = { id };
    const token = this.jwtService.sign(payload);

    const user = await this.userModel.findByIdAndUpdate(
      id,
      { token },
      { new: true },
    );

    return user;
  }

  private async isUser(email: string): Promise<UserDocument> {
    return await this.userModel.findOne({
      email,
    });
  }

  private async newUser(newUserData: NewUserDto): Promise<UserDocument> {
    const picture = newUserData.picture
      ? newUserData.picture
      : this.avatar(newUserData.username);

    const user = await this.userModel.create({
      ...newUserData,
      picture,
    });

    const userToken = await this.generatorToken(user._id);

    return userToken;
  }

  private avatar(name: string) {
    return `https://api.multiavatar.com/${name}.png`;
  }
}
