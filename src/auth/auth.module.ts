import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleOauthGuard } from './guards/google-oauth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [PrismaModule],
    controllers: [AuthController],
    providers: [AuthService, JwtAuthGuard, GoogleOauthGuard, JwtStrategy, GoogleStrategy, JwtService],
})
export class AuthModule {}