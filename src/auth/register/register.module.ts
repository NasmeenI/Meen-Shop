import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './strategies';

@Module({
  imports: [
    JwtModule.register({}),
  ],
  controllers: [RegisterController],
  providers: [
    RegisterService, 
    JwtStrategy,
    JwtService,
  ]
})
export class RegisterModule {}