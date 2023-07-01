import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class SignupDto{
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    hash: string

    @IsString()
    @IsNotEmpty()
    username: string

    @IsString()
    picture: string
}