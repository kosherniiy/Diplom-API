import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsEmail, IsString, MinLength, IsEnum, IsNotEmpty } from 'class-validator';
import { User } from '@prisma/client';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsEnum(['MENTOR', 'STUDENT'])
  role: 'MENTOR' | 'STUDENT';
}

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export interface LoginResponseDto {
  access_token: string;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('register')
  async register(@Body() body: RegisterDto): Promise<Omit<User, 'hash'>> {
    console.log('Register body:', JSON.stringify(body, null, 2));
    return this.authService.register(body.name, body.email, body.password, body.role);
  }

  @Post('login')
  async login(@Body() body: LoginDto): Promise<LoginResponseDto> {
    console.log('Login body:', JSON.stringify(body, null, 2));
    return this.authService.login(body.email, body.password);
  }
}