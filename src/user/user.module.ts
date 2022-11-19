import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from 'src/db-schema/user-schema';
import { Album, AlbumSchema } from 'src/db-schema/album.schema';
// import { Track, TrackSchema } from 'src/db-schema/track.schema';
// import { Comment, CommentSchema } from 'src/db-schema/comment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Album.name, schema: AlbumSchema }]),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [JwtModule, UserService, MongooseModule],
})
export class UserModule {}
