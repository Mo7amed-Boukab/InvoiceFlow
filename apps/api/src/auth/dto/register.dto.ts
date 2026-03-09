import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class RegisterDto {
    @IsString()
    @MinLength(2)
    @MaxLength(255)
    companyName: string;

    @IsString()
    @MinLength(2)
    @MaxLength(255)
    firstName: string;

    @IsString()
    @MinLength(2)
    @MaxLength(255)
    lastName: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(100)
    password: string;
}
