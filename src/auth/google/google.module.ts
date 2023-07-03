import { Module } from '@nestjs/common';
import { GoogleController } from './google.controller';
import { GoogleService } from './google.service';
import { GoogleOauthGuard } from './guards';
import { JwtAuthGuard } from '../register/guards'
import { GoogleStrategy } from './strategies';
import { JwtStrategy } from '../register/strategies';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({}),
  ],
  controllers: [GoogleController],
  providers: [
    GoogleService,
    JwtAuthGuard, 
    GoogleOauthGuard, 
    JwtStrategy, 
    GoogleStrategy, 
    JwtService
  ],
})
export class GoogleModule {}