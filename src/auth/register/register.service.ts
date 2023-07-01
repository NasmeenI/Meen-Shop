import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { SigninDto, SignupDto } from './dto';
import { Prisma } from '@prisma/client';
import * as argon from 'argon2';

@Injectable()
export class RegisterService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService, 
  ) {}

  async signup(dto: SignupDto) {
    // generate the password hash
    dto.hash = await argon.hash(dto.hash);

    try{
        // save the new user in the db
        const user = await this.prisma.user.create({
            data: {
                provider: 'register',
                ...dto
            },
        });
        
        // return the saved user
        return this.signToken(user.id, user.email)
        
    } catch(error){
        if(error instanceof Prisma.PrismaClientKnownRequestError) {
            if(error.code === 'P2002') {
                throw new ForbiddenException('Credentials taken');
            }
        }
        throw error;
    }
  }

  async signin(dto: SigninDto) {
      // sign the user by email
      const user = await this.prisma.user.findUnique({
          where: {
              email: dto.email,
          },
      });

      // if user does not exist throw exception
      if(!user) throw new ForbiddenException('Credentials incorrect');

      // compare password
      const pwMatches = await argon.verify(
          user.hash,
          dto.password,
      );

      // if password incorrect throw exception
      if(!pwMatches) throw new ForbiddenException('Credentials incorrect');

      // send back the user
      return this.signToken(user.id, user.email)
  }

  async signToken(userId: String, email: String): Promise<{ access_token: String }> {
      const payload = {
          sub: userId,
          email
      }
      const secret = process.env.JWT_SECRET;
      
      const token = await this.jwtService.signAsync(payload, {
          expiresIn: '15m',
          secret: secret,
      })

      return {
          access_token: token
      }
  }
}