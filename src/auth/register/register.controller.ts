import {
  Controller,
} from '@nestjs/common';
import { RegisterService } from './register.service';

@Controller('auth/rigister')
export class RegisterController {
  constructor(private registerService: RegisterService) {}
}