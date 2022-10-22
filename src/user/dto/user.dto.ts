import { ObjectId } from 'mongoose';

export class UserDto {
  readonly username: string;
  readonly password: string;
  readonly email: string;
  readonly token: string;
  readonly track_list: [ObjectId];
  readonly track_push: [ObjectId];
}
