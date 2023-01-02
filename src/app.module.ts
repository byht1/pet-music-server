import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TrackModule } from './track/track.module';
import { CommentModule } from './comment/comment.module';
import { AlbumModule } from './album/album.module';
import { UserModule } from './user/user.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    MongooseModule.forRoot(process.env.DB_HOST),
    PassportModule.register({ session: true }),
    UserModule,
    TrackModule,
    AlbumModule,
    CommentModule,
  ],
})
export class AppModule {}
