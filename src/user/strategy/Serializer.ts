/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserDocument } from 'src/db-schema/user-schema';
import { UserService } from '../user.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private userService: UserService) {
    super();
  }

  serializeUser(user: UserDocument, done: Function) {
    done(null, user);
  }

  async deserializeUser(payload: any, done: Function) {
    const user = await this.userService.findUser(payload.id);
    return user ? done(null, user) : done(null, null);
  }
}
