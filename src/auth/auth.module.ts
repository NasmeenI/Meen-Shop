import { Module } from '@nestjs/common';
import { GoogleModule } from './google/google.module';
import { RegisterModule } from './register/register.module';

@Module({
  imports: [
    GoogleModule,
    RegisterModule
  ],
})
export class AuthModule {}
