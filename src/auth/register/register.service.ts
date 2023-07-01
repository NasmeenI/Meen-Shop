import {
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class RegisterService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService, 
  ) {}
}