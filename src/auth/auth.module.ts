import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleOauthGuard, JwtAuthGuard } from './guards';
import { GoogleStrategy, JwtStrategy } from './strategies';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
    imports: [
      PrismaModule,
      JwtModule.register({}),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtAuthGuard, GoogleOauthGuard, JwtStrategy, GoogleStrategy, JwtService],
})
export class AuthModule {}