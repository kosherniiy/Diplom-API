// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async createUser(data: {
    name: string;
    email: string;
    hash: string;
    role: 'MENTOR' | 'STUDENT';
  }): Promise<User> {
    return this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        hash: data.hash,
        role: data.role,
      },
    });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
}