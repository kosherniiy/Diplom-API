import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { LoginResponseDto } from './auth.controller';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async register(name: string, email: string, password: string, role: 'MENTOR' | 'STUDENT'): Promise<Omit<User, 'hash'>> {
    console.log('Register inputs:', { name, email, password, role });

    // Проверка, что пользователь с таким email не существует
    const existingUser = await this.usersService.findUserByEmail(email);
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    // Проверка, что пароль не пустой
    if (!password || typeof password !== 'string' || password.trim() === '') {
      throw new BadRequestException('Password is required and must be a non-empty string');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.usersService.createUser({
      name,
      email,
      hash: hashedPassword,
      role,
    });
    const { hash, ...result } = user;
    return result;
  }

  async login(email: string, password: string): Promise<LoginResponseDto> {
    console.log('Login inputs:', { email, password });
    // Проверка, что пароль не пустой
    if (!password || typeof password !== 'string' || password.trim() === '') {
      throw new BadRequestException('Password is required and must be a non-empty string');
    }

    const user = await this.usersService.findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.hash))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}