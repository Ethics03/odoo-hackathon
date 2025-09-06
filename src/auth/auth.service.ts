import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(payload: CreateUserDTO) {
    try {
      if (!payload.email || !payload.username) {
        throw new BadRequestException('Username and email is required');
      }

      const existingUser = await this.prisma.user.findUnique({
        where: { email: payload.email },
      });
      if (existingUser) {
        throw new ConflictException('User already exists');
      }

      const user = await this.prisma.user.create({
        data: {
          username: payload.username,
          email: payload.email,
        },
        select: {
          id: true,
          username: true,
          email: true,
          createdAt: true,
        },
      });
      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new BadRequestException('Failed to create user');
    }
  }

  async findUserByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
      },
    });
  }
}
