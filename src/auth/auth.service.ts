import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { generateFromEmail } from 'unique-username-generator';
import { RegisterUserDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService, 
  ) {}

  async signIn(user: RegisterUserDto): Promise<{ access_token: String }> {
    if (!user) 
      throw new BadRequestException('Unauthenticated');
    
    const userExists = await this.prisma.user.findUnique({
      where: {
        email: user.email,
      }
    });
    
    if (!userExists) 
      return await this.registerUser(user);
    
    return await this.signToken(userExists.id, userExists.email);
  }

  async registerUser(user: RegisterUserDto): Promise<{ access_token: String }>  {
    try {
      const newUser = await this.prisma.user.create({
        data: {
          ...user,
        }
      })

      await this.prisma.user.update({
        where: {
          email: user.email,
        },
        data: {
          username: generateFromEmail(user.email, 5),
        }
      })

      return await this.signToken(newUser.id, newUser.email);
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async signToken(userId: String, email: String): Promise<{ access_token: String }> {
    const payload = {
        sub: userId,
        email
    }

    const token = await this.jwtService.signAsync(payload, {
        expiresIn: '15m',
        secret: process.env.DATABASE_URL,
    })

    return { access_token: token }
  }

  async findUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      }
    });

    if (!user) return null;
    return user;
  }
}