import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from 'src/db-schema/user-schema';
import { Album, AlbumSchema } from 'src/db-schema/album.schema';
import { ConfigModule } from '@nestjs/config';
import { EmailMessageModule } from 'src/email-message/email-message.module';
import { EmailMessageService } from 'src/email-message/email-message.service';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Album.name, schema: AlbumSchema }]),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h',
      },
    }),
    EmailMessageModule,
  ],
  providers: [UserService, EmailMessageService],
  controllers: [UserController],
  exports: [JwtModule, UserService, MongooseModule, EmailMessageService],
})
export class UserModule {}
