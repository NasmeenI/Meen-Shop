import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { generateFromEmail } from 'unique-username-generator';
import { RegisterUserDto } from './dto/index';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService, 
  ) {}

  generateJwt(payload) {
    return this.jwtService.sign(payload);
  }

  async signIn(user) {
    if (!user) {
      throw new BadRequestException('Unauthenticated');
    }

    const userExists = await this.prisma.user.findUnique({
      where: {
        email: user.email,
      }
    })

    if (!userExists) {
      return this.registerUser(user);
    }

    return this.generateJwt({
      sub: userExists.id,
      email: userExists.email,
    });
  }

  async registerUser(user: RegisterUserDto) {
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

      return this.generateJwt({
        sub: newUser.id,
        email: newUser.email,
      });
    } catch {
      throw new InternalServerErrorException();
    }
  }

//   async findUserByEmail(email) {
//     const user = await this.userRepository.findOne({ email });

//     if (!user) {
//       return null;
//     }

//     return user;
  // }
}