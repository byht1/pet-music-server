import { ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: 'nickname користувача' })
  readonly username: string;

  @ApiProperty({ example: 'Пароль користувача' })
  readonly password: string;

  @ApiProperty({ example: 'Email користувача' })
  readonly email: string;

  readonly token: string;
  readonly track_list: [ObjectId];
  readonly track_push: [ObjectId];
}
