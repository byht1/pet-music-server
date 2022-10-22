import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/db-schema/user-schema';
import { JwtService } from '@nestjs/jwt';

export class JwtAuthGuard implements CanActivate {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    try {
      const [bearer, token] = req.headers.authorization.split(' ');

      if (bearer !== 'Bearer' || !token) {
        throw new HttpException('Не валідний токен', HttpStatus.UNAUTHORIZED);
      }

      const isValidToken = this.jwtService.verify(token);

      const user = await this.userModel.findById(isValidToken.id);

      if (!user || user.token !== token) {
        throw new HttpException('Не валідний токен', HttpStatus.UNAUTHORIZED);
      }

      req.user = isValidToken;

      return true;
    } catch (error) {
      throw new HttpException('Не валідний токен', HttpStatus.UNAUTHORIZED);
    }
  }
}
