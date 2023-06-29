import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
  ) {
    super({
      clientID: "743077004197-99r4k72ubduio471sdh6r2hftt0jg5lp.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3000/auth/google/redirect",
      scope: ['profile', 'email'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, name, emails, photos } = profile;

    const user = {
      provider: 'google',
      providerId: id,
      email: emails[0].value,
      name: `${name.givenName} ${name.familyName}`,
      picture: photos[0].value,
    };
    console.log(profile);

    done(null, user);
  }
}