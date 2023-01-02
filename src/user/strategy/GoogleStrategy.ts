import { UserService } from 'src/user/user.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/api/users/google/redirect',
      scope: ['profile', 'email'],
      passReqToCallback: true,
    });
  }

  async validate(accToken: string, refreshToken: string, profile: Profile) {
    console.log('🚀 profile', profile);
    // console.log('🚀 refreshToken', refreshToken);
    // console.log('🚀 accToken', accToken);

    const data = {
      email: profile.emails[0].value,
      username: profile.displayName,
    };

    const user = await this.userService.isUser(data);

    if (user) return user;

    const newUser = await this.userService.newUser({
      ...data,
      method_registration: 'google',
    });

    return newUser || null;
  }
}
