import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { Album, AlbumSchema } from 'src/db-schema/album.schema';
import { Comment, CommentSchema } from 'src/db-schema/comment.schema';
import { User, UserSchema } from 'src/db-schema/user-schema';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([{ name: Album.name, schema: AlbumSchema }]),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AlbumController],
  providers: [AlbumService, UserService],
})
export class AlbumModule {}
